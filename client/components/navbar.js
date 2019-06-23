import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="header">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <div>
        <img className="navbar-img" src="/money.png" />
        <h1 className="navbar-brand">Money Mapper</h1>
      </div>
      {isLoggedIn ? (
        <div className="navbar-nav">
          {/* The navbar will show these links after you log in */}
          <Link className="nav-link" to="/linkAccount">
            Link Account
          </Link>
          <Link className="nav-link" to="/account">
            Account
          </Link>
          <Link className="nav-link" to="/map">
            Map
          </Link>
          <a className="nav-link" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="navbar-nav">
          {/* The navbar will show these links before you log in */}
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
