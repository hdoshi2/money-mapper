const _ = require('lodash')

export const getExpenseByCategory = transactions => {
  const groupByCategory = _.groupBy(transactions, 'category1')
  const categories = Object.keys(groupByCategory)
  const expenseCategory = {}

  categories.forEach(category => {
    expenseCategory[category] = groupByCategory[category]
      .reduce((acc, {amount}) => acc + Number(amount), 0)
      .toFixed(2)
  })
  return expenseCategory
}
