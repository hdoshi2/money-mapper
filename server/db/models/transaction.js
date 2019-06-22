const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  account_id: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.DECIMAL
  },
  category1: {
    type: Sequelize.STRING
  },
  category2: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  region: {
    type: Sequelize.STRING
  },
  postal_code: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  lat: {
    type: Sequelize.DECIMAL
  },
  lon: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Transaction
