import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {getDataByCategory} from './utility'
import LegendDonut from './LegendDonut'

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
      public_token
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
  }
})

export const UserHome = props => {
  const {email, transactions, accounts} = props
  console.log('accounts', accounts)
  const donutData = getDataByCategory(transactions)

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <button
        id="link-button"
        type="button"
        className="btn btn-primary"
        onClick={() => handler.open()}
      >
        Link Account
      </button>
      <div>
        <LegendDonut data={donutData} />

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col">Sub-Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(item => {
              return (
                <tr key={item.id}>
                  <th scope="row">{item.date}</th>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{item.category1}</td>
                  <td>{item.category2}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('state', state)
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
