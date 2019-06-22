const _ = require('lodash')

const getTotalexpense = transactions => {
  return transactions
    .reduce((acc, {amount}) => acc + Number(amount), 0)
    .toFixed(2)
}

export const getDataByCategory = transactions => {
  const groupByCategory = _.groupBy(transactions, 'category1')
  const categories = Object.keys(groupByCategory)
  const data = []
  const totalexpense = getTotalexpense(transactions)

  categories.forEach((category, i) => {
    if (category !== 'Transfer' && category !== 'Payment') {
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
    }
  })
  return data
}
