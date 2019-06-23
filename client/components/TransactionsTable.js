import React from 'react'

const TransactionsTable = ({transactions}) => (
  <>
    <h5 className="d-flex justify-content-center">Transactions</h5>
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
              <td>${Number(item.amount).toFixed(2)}</td>
              <td>{item.category1}</td>
              <td>{item.category2}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </>
)

export default TransactionsTable
