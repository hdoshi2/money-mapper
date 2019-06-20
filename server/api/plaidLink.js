const router = require('express').Router()
const {User} = require('../db/models')
var plaid = require('plaid')

module.exports = router

var ACCESS_TOKEN = null
var PUBLIC_TOKEN = null

var client = new plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  plaid.environments.sandbox
)

// Accept the public_token sent from Link
router.post('/get_access_token', function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error !== null) {
      console.log('Could not exchange public_token!' + '\n' + error)
      return response.json(error)
    }
    ACCESS_TOKEN = tokenResponse.access_token
    const ITEM_ID = tokenResponse.item_id
    console.log('Access Token: ' + ACCESS_TOKEN)
    console.log('Item ID: ' + ITEM_ID)
    response.json({error: false})
  })
})

////TESTING
