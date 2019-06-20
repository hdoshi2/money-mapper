import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

/**
 * COMPONENT
 */

const handler = window.Plaid.create({
  clientName: 'Plaid Quickstart',
  countryCodes: ['US'],
  env: 'sandbox',
  // Replace with your public_key from the Dashboard
  key: '962158d31d9a8e0bdc787718aa471e',
  product: ['transactions'],
  // Optional, use webhooks to get transaction and error updates
  // webhook: 'https://requestb.in',
  language: 'en',
  // Optional, specify a user object to enable all Auth features
  user: {
    legalName: 'John Appleseed',
    emailAddress: 'jappleseed@yourapp.com'
  },
  onLoad: function() {
    // Optional, called when Link loads
  },
  onSuccess: function(public_token, metadata) {
    console.log('public_token', public_token)
    console.log('metadata', metadata)

    axios.post('/api/link/get_access_token', {
      public_token: public_token
    })
  },
  onExit: function(err, metadata) {
    // The user exited the Link flow.
    if (err != null) {
      // The user encountered a Plaid API error prior to exiting.
    }
    // metadata contains information about the institution
    // that the user selected and the most recent API request IDs.
    // Storing this information can be helpful for support.
  },
  onEvent: function(eventName, metadata) {
    // Optionally capture Link flow events, streamed through
    // this callback as your users connect an Item to Plaid.
    // For example:
    // eventName = "TRANSITION_VIEW"
    // metadata  = {
    //   link_session_id: "123-abc",
    //   mfa_type:        "questions",
    //   timestamp:       "2017-09-14T14:42:19.350Z",
    //   view_name:       "MFA",
    // }
  }
})

export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <button id="link-button" type="button" onClick={() => handler.open()}>
        Link Account
      </button>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
