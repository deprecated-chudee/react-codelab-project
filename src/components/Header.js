import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const loginButton = (
    <li>
        <Link to="/login">
            <i className="material-icons">vpn_key</i>
        </Link>
    </li>
)

const logoutButton = (
    <li>
        <a><i className="material-icons">lock_open</i></a>
    </li>
)

const Header = (props) => {
    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <Link to="/" className="brand-logo center">MEMOPAD</Link>

                <ul>
                    <li><a><i className="material-icons">search</i></a></li>
                </ul>

                <div className="right">
                    <ul>
                        { props.isLoggedIn ? logoutButton : loginButton }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
}

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error('logout function is not defined') }
}

export default Header