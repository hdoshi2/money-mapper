import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

/**
 * COMPONENT
 */

export const UserHome = props => {
  const {email} = props

  const handler = window.Plaid.create({
    clientName: 'Plaid Quickstart',
    countryCodes: ['US'],
    env: 'sandbox',
    key: '962158d31d9a8e0bdc787718aa471e',
    product: ['transactions'],
    language: 'en',
    onSuccess: function(public_token, metadata) {
      axios.post('/api/link/get_access_token', {
        public_token
      })
      //below redirects after completing the route but not working yet.
      // window.location.href = `/account`
    },
    onExit: function(err, metadata) {
      // The user exited the Link flow.
      if (err != null) {
        // The user encountered a Plaid API error prior to exiting.
      }
    }
  })

  return (
    <div className="home">
      <h3>Welcome, {email}</h3>
      <button
        id="link-button"
        type="button"
        className="btn btn-primary link-btn"
        onClick={() => handler.open()}
      >
        Link Account
      </button>
      <div className="container mb-3">
        <div className="row">
          <div className="col-sm-4">1 of 2</div>
          <div className="col-sm-4">2 of 2</div>
        </div>
        <div className="row">
          <div className="col-sm-4">1 of 3</div>
          <div className="col-sm-4">2 of 3</div>
          <div className="col-sm-4">3 of 3</div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    transactions: state.transaction,
    accounts: state.account
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
