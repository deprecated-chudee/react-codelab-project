'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/*
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAM EXISTS
*/

router.post('/signup', function (req, res) {
    var usernameRegex = /^[a-z0-9]+$/;

    if (!usernameRegex.test(req.body.username)) {
        return res.status(400).json({
            error: 'BAD USERNAME',
            code: 1
        });
    }

    if (!req.body.password.length < 4 || typeof req.body.password !== 'string') {
        return res.status(400).json({
            error: 'BAD PASSWORD',
            code: 2
        });
    }

    _account2.default.findOne({ username: req.body.username }, function (err, exists) {
        if (err) throw err;
        if (exists) {
            return res.status(409).json({
                error: 'USERNAME EXISTS',
                code: 3
            });
        }

        var account = new _account2.default({
            username: req.body.username,
            password: req.body.password
        });

        account.password = account.generateHash(account.password);

        account.save(function (err) {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

router.post('/signin', function (req, res) {
    if (typeof req.body.password !== 'string') {
        return res.status(401).json({
            error: 'LOGIN FAILED',
            code: 1
        });
    }

    _account2.default.findOne({ username: req.body.username }, function (err, account) {
        if (err) throw err;

        if (!account) {
            return res.status(401).json({
                error: 'LOGIN FAILED',
                code: 1
            });
        }

        if (!account.validateHash(req.body.password)) {
            return res.status(401).json({
                error: 'LOGIN FAILED',
                code: 1
            });
        }

        var session = req.session;
        session.loginInfo = {
            _id: account._id,
            username: account.username
        };

        return res.json({ success: true });
    });
});

router.get('/getinfo', function (req, res) {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
});

router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) throw err;
    });
    return res.json({ success: true });
});

exports.default = router;