import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchTranscations, fetchAccounts} from '../store'
import {getDataByCategory} from './utility'
import LegendDonut from './LegendDonut'
import TransactionsTable from './TransactionsTable'

/**
 * COMPONENT
 */

export const UserHome = props => {
  const {transactions, accounts} = props
  const data = getDataByCategory(transactions)

  //implementing react hooks
  useEffect(() => {
    props.loadNewData()
  }, [])

  return (
    <div>
      <h4 className="d-flex justify-content-center">ACCOUNT SUMMARY</h4>

      <div>
        <h5 className="d-flex justify-content-center">Spending By Category</h5>
        <LegendDonut data={data} />
        <hr />
        <div className="columnCard">
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
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
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
