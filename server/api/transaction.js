const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const transaction = await Transaction.findAll({
      where: {
        userId: req.user.id
      },
      order: [['date', 'DESC']]
    })
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})
