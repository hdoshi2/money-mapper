const Sequelize = require('sequelize')
const db = require('../db')

const Account = db.define('account', {
  accountId: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  officialName: {
    type: Sequelize.STRING
  },
  subtype: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  balanceAvailable: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.0
  },
  balanceCurrent: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.0
  },
  balanceLimit: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.0
  }
})

module.exports = Account
