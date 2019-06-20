const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  item_id: {
    type: Sequelize.STRING
  },
  access_token: {
    type: Sequelize.STRING
  }
})

module.exports = Item
