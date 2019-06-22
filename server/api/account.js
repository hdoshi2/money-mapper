const router = require('express').Router()
const {Account} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const account = await Account.findAll({
      // where: {
      //   userId: req.user.id
      // },
    })
    res.json(account)
  } catch (err) {
    next(err)
  }
})
