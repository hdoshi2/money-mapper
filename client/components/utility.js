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
  return data
}

export const getMapdata = transactions => {
  const groupByName = _.groupBy(transactions, 'name')
  const placeName = Object.keys(groupByName)
  const data = []

  placeName.forEach(name => {
    const amount = getTotalexpense(groupByName[name])
    const {category1, category2, lat, lon} = groupByName[name][0]
    data.push({
      name,
      amount,
      category1,
      category2,
      lat: +lat,
      lon: +lon
    })
  })
  return data
}
