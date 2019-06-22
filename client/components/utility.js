const _ = require('lodash')

const getTotalexpense = transactions => {
  return transactions
    .reduce((acc, {amount}) => acc + Number(amount), 0)
    .toFixed(0)
}

export const getDataByCategory = transactions => {
  transactions = transactions.filter(
    ({category1}) => category1 !== 'Payment' && category1 !== 'Transfer'
  )
  const groupByCategory = _.groupBy(transactions, 'category1')
  const categories = Object.keys(groupByCategory)
  const data = []
  const totalexpense = getTotalexpense(transactions)

  categories.forEach((category, i) => {
    const totalExpenseByCategory = getTotalexpense(groupByCategory[category])

    const averagePercentByCategory = (
      totalExpenseByCategory /
      totalexpense *
      100
    ).toFixed(0)

    data.push({
      id: i++,
      name: category,
      quantity: totalExpenseByCategory,
      percentage: averagePercentByCategory
    })
  })
  console.log('data', data)
  return data
}
