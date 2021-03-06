import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, sandboxLogin} = props

  return (
    <div className="form-container">
      <div className="card form-card">
        <form onSubmit={handleSubmit} name={name}>
          <div className="form-group">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input
              name="email"
              type="text"
              className="form-control form-control-lg"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              name="password"
              type="password"
              className="form-control form-control-lg"
            />
          </div>
          <div>
            <button className="btn btn-primary" type="submit">
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        {/* <a href="/auth/google">{displayName} with Google</a> */}
        <div>{sandboxLogin}</div>
      </div>
      {/* <div>
        <div>Testing Mode:</div>
        <div>Email: guest@email.com</div>
        <div>Password: 1234</div>
      </div> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    sandboxLogin: 'Testing Mode: Email: guest@email.com, Password: 1234'
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
