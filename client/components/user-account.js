import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {fetchTranscations, fetchAccounts} from '../store'
import {getDataByCategory} from './utility'
import LegendDonut from './LegendDonut'

/**
 * COMPONENT
 */

export const UserHome = props => {
  const {email, transactions, accounts} = props
  const donutData = getDataByCategory(transactions)

  return (
    <div>
      <h3>Welcome, {email}</h3>

      <div>
        <LegendDonut data={donutData} />
        <div className="card-columns">
          {accounts.map(item => {
            return (
              <div
                className="card"
                key={item.id}
                className="card text-white bg-info mb-3"
              >
                <div className="card-body">
                  <div>
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.officialName}</p>
                  </div>
                </div>
                <table className="card-table table">
                  <thead>
                    <tr>
                      <th scope="col">Type</th>
                      <th scope="col">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.type}</td>
                      <td>${item.balanceCurrent}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
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

const mapDispatch = dispatch => {
  return {
    loadNewData() {
      dispatch(fetchTranscations())
      dispatch(fetchAccounts())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
