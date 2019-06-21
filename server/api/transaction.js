const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const transaction = await Transaction.findAll()
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})
