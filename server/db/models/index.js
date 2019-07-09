const User = require('./user')
const Transaction = require('./transaction')
const Account = require('./account')
const Item = require('./Item')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Item.belongsTo(User)
User.hasMany(Item)

Transaction.belongsTo(User)
User.hasMany(Item)

Account.belongsTo(User)
User.hasMany(Account)

Transaction.belongsTo(Account)
Account.hasMany(Transaction)

module.exports = {
  User,
  Item,
  Transaction,
  Account
}
