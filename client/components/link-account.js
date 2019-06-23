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
      {/* <h3>Welcome, {email}</h3> */}
      <button
        id="link-button"
        type="button"
        className="btn btn-primary link-btn"
        onClick={() => handler.open()}
      >
        Link Account With PLAID
      </button>
      {/* <div className="plaid-center">
        <div className="row">
          <div className="col-sm-4">
            <img src="https://plaid.com/assets/img/docs/quickstart/item-overview-01.png" />
          </div>
          <div className="col-sm-4">
            <img src="https://plaid.com/assets/img/docs/quickstart/item-overview-02.png" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <img src="https://plaid.com/assets/img/docs/quickstart/item-creation-01.png" />
          </div>
          <div className="col-sm-4">
            <img src="https://plaid.com/assets/img/docs/quickstart/item-creation-02.png" />
          </div>
          <div className="col-sm-4">
            <img src="https://plaid.com/assets/img/docs/quickstart/item-creation-03.png" />
          </div>
        </div>
      </div> */}
      <div className="plaid-center">
        <h2>Item overview</h2>
        <p>
          Your user can have multiple Items, or sets of credentials. Each Item
          can have many associated accounts, which hold information such as
          balance, name, and account type.{' '}
        </p>
        <div>
          <img src="https://plaid.com/assets/img/docs/quickstart/item-overview-01.png" />
        </div>
        <div>
          <img src="https://plaid.com/assets/img/docs/quickstart/item-overview-02.png" />
        </div>
        <hr />
        <h2>Item creation flow</h2>
        <p>
          An end-to-end integration involves client-side and server-side
          configurations. Below is a brief overview of how you'll be creating
          Items with Link.
        </p>
        <div>
          <img src="https://plaid.com/assets/img/docs/quickstart/item-creation-01.png" />
        </div>
        <div>
          <img src="https://plaid.com/assets/img/docs/quickstart/item-creation-02.png" />
        </div>
        <div>
          <img src="https://plaid.com/assets/img/docs/quickstart/item-creation-03.png" />
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
