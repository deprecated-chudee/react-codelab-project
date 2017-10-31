import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
} from './ActionTypes'

export function loginRequest(username, password) {

}

export function login() {
    return { 
        type: AUTH_LOGIN 
    }
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    }
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    }
}