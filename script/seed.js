'use strict'

const db = require('../server/db')
const {User, Item, Account, Transaction} = require('../server/db/models')

const payday = ['2019-05-11', '2019-05-25', '2019-06-08', '2019-06-22']
const onceAMonth = ['2019-05-01', '2019-06-01']

const coffeeShop = [
  {name: 'Starbucks', lat: 40.704902, lon: -74.008954},
  {name: 'Gregorys Coffee', lat: 40.706356, lon: -74.01258},
  {name: 'Bluestone Lane', lat: 40.705418, lon: -74.008395},
  {name: 'Cafe Grumpy', lat: 40.72074, lon: -73.996027},
  {name: "David's Tea", lat: 40.74396, lon: -73.992679}
]
const restaurant = [
  {name: 'Naya', lat: 40.702227, lon: -74.011657},
  {name: 'Open Market', lat: 40.705715, lon: -74.010096},
  {name: 'Dig In', lat: 40.705199, lon: -74.014841},
  {name: 'Buddha Bodhai', lat: 40.716485, lon: -74.999291},
  {name: `Blaze`, lat: 40.428712, lon: -74.169021}
]
const grocery = [
  {name: 'Whole Foods', lat: 40.74071, lon: -74.171112},
  {name: `Trader Joe's`, lat: 40.723432, lon: -74.296189}
]

const shops = [{name: 'Amazon', lat: 47.616308, lon: -122.339236}]

function randomStore(category) {
  return category[Math.floor(Math.random() * category.length)]
}

function randomDate(start, end) {
  var d = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    month = '' + d.getMonth(),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

function doTimes(n) {
  const results = []
  while (n--) {
    results.push(randomDate(new Date(2018, 5, 1), new Date()))
  }
  return results
}

function randomBigAmount() {
  return Math.floor(Math.random() * 40) + 30
}

function randomAmount() {
  return Math.floor(Math.random() * 30) + 10
}
function randomAmountSmall() {
  return Math.floor(Math.random() * 5) + 5
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  /*-------------------- USERS ----------------------*/

  /*-------------------- USERS ----------------------*/
  const hari = await User.create({
    email: 'hari@email.com',
    password: '1234'
  })
  const guest = await User.create({
    email: 'guest@email.com',
    password: '1234'
  })

  /*-------------------- ITEMS ----------------------*/
  const hariItem = await Item.create({
    item_id: '456',
    access_token: 'access-sandbox-123',
    userId: hari.id
  })
  const guestItem = await Item.create({
    item_id: '123',
    access_token: 'access-sandbox-456',
    userId: guest.id
  })

  /*-------------------- ACCOUNTS ----------------------*/
  const hariChecking = await Account.create({
    accountId: 'hariChaseAccount',
    balanceCurrent: 3948.45,
    balanceAvailable: 5000,
    name: 'Chase Checking',
    type: 'Checking',
    userId: hari.id
  })
  const hariCredit = await Account.create({
    accountId: 'hariChaseCredit',
    balanceCurrent: 1495.23,
    balanceAvailable: 7000,
    name: 'Citi AAdvantage Platinum Mastercard',
    type: 'Credit Card',
    userId: hari.id
  })
  const hariSaving = await Account.create({
    accountId: 'hariChaseSaving',
    balanceCurrent: 5230.31,
    balanceAvailable: 10000,
    name: 'Ally Bank Saving',
    type: 'Savings',
    userId: hari.id
  })

  const guestChecking = await Account.create({
    accountId: 'guestChaseChecking',
    balanceCurrent: 3948.89,
    balanceAvailable: 4000,
    name: 'Bank of America Checking',
    type: 'Checking',
    userId: guest.id
  })
  const guestCredit = await Account.create({
    accountId: 'guestChaseCredit',
    balanceCurrent: 2938.36,
    balanceAvailable: 3000,
    name: 'Chase Sapphire Credit Card',
    type: 'Credit Card',
    userId: guest.id
  })
  const guestSaving = await Account.create({
    accountId: 'guestChaseSaving',
    balanceCurrent: 6907.23,
    balanceAvailable: 12000,
    name: 'Bank of America Saving',
    type: 'Savings',
    userId: guest.id
  })

  /*-------------------- TRANSACTIONS ---------------------*/

  const allTransactions = [
    ...payday.map(day => {
      return {
        name: 'Google Payroll',
        amount: -2200,
        date: day,
        account_id: guestChecking.accountId,
        category1: 'Transfer',
        category2: 'Payroll',
        userId: guest.id
      }
    }),
    ...payday.map(day => {
      return {
        name: 'Google Payroll',
        amount: -500,
        date: day,
        account_id: guestSaving.accountId,
        category1: 'Transfer',
        category2: 'Payroll',
        userId: guest.id
      }
    }),
    ...onceAMonth.map(day => {
      return {
        name: 'Credit Card Payment',
        amount: 200,
        date: day,
        account_id: guestChecking.accountId,
        category1: 'Payment',
        category2: 'Credit Card',
        userId: guest.id
      }
    }),
    ...onceAMonth.map(day => {
      return {
        name: 'Rent',
        amount: 1500,
        date: day,
        account_id: guestChecking.accountId,
        category1: 'Payment',
        category2: 'Rent',
        userId: guest.id
      }
    }),
    ...onceAMonth.map(day => {
      return {
        name: 'ConEd',
        amount: 50,
        date: day,
        account_id: guestChecking.accountId,
        category1: 'Payment',
        category2: 'Electric Bill',
        userId: guest.id
      }
    }),
    ...doTimes(30).map(day => {
      const {name, lat, lon} = randomStore(coffeeShop)
      return {
        name,
        amount: randomAmountSmall(),
        date: day,
        account_id: guestCredit.accountId,
        category1: 'Food and Drink',
        category2: 'Coffee Shop',
        userId: guest.id,
        lat,
        lon
      }
    }),
    ...doTimes(40).map(day => {
      const {name, lat, lon} = randomStore(restaurant)
      return {
        name,
        amount: randomAmountSmall(),
        date: day,
        account_id: guestCredit.accountId,
        category1: 'Food and Drink',
        category2: 'Restaurants',
        userId: guest.id,
        lat,
        lon
      }
    }),
    ...doTimes(15).map(day => {
      const {name, lat, lon} = randomStore(grocery)
      return {
        name,
        amount: randomAmount(),
        date: day,
        account_id: guestCredit.accountId,
        category1: 'Shops',
        category2: 'Supermarkets and Groceries',
        userId: guest.id,
        lat,
        lon
      }
    }),
    ...doTimes(15).map(day => {
      const {name, lat, lon} = randomStore(shops)
      return {
        name,
        amount: randomBigAmount(),
        date: day,
        account_id: guestCredit.accountId,
        category1: 'Shops',
        category2: 'Clothing',
        userId: guest.id,
        lat,
        lon
      }
    }),
    {
      name: 'United Airlines',
      amount: 350,
      date: '2018-06-19',
      account_id: guestCredit.accountId,
      category1: 'Travel',
      category2: 'Airlines and Aviation Services',
      userId: guest.id
    },
    ...onceAMonth.map(day => {
      return {
        name: 'Netflix',
        amount: 12,
        date: day,
        account_id: guestCredit.accountId,
        category1: 'Service',
        category2: 'Entertainment',
        userId: guest.id
      }
    }),
    /*----------- HARI SEED FILE-----------------*/
    ...payday.map(day => {
      return {
        name: 'Facebook Payroll',
        amount: -2200,
        date: day,
        account_id: hariChecking.accountId,
        category1: 'Transfer',
        category2: 'Payroll',
        userId: hari.id
      }
    }),
    ...payday.map(day => {
      return {
        name: 'FacebookPayroll',
        amount: -500,
        date: day,
        account_id: hariSaving.accountId,
        category1: 'Transfer',
        category2: 'Payroll',
        userId: hari.id
      }
    }),
    ...onceAMonth.map(day => {
      return {
        name: 'Credit Card Payment',
        amount: 200,
        date: day,
        account_id: hariChecking.accountId,
        category1: 'Payment',
        category2: 'Credit Card',
        userId: hari.id
      }
    }),
    ...onceAMonth.map(day => {
      return {
        name: 'Rent',
        amount: 1500,
        date: day,
        account_id: hariChecking.accountId,
        category1: 'Payment',
        category2: 'Rent',
        userId: hari.id
      }
    }),
    ...onceAMonth.map(day => {
      return {
        name: 'ConEd',
        amount: 50,
        date: day,
        account_id: hariChecking.accountId,
        category1: 'Payment',
        category2: 'Electric Bill',
        userId: hari.id
      }
    }),
    ...doTimes(30).map(day => {
      const {name, lat, lon} = randomStore(coffeeShop)
      return {
        name,
        amount: randomAmountSmall(),
        date: day,
        account_id: hariCredit.accountId,
        category1: 'Food and Drink',
        category2: 'Coffee Shop',
        userId: hari.id,
        lat,
        lon
      }
    }),
    ...doTimes(30).map(day => {
      const {name, lat, lon} = randomStore(restaurant)
      return {
        name,
        amount: randomAmountSmall(),
        date: day,
        account_id: hariCredit.accountId,
        category1: 'Food and Drink',
        category2: 'Restaurants',
        userId: hari.id,
        lat,
        lon
      }
    }),
    ...doTimes(30).map(day => {
      const {name, lat, lon} = randomStore(grocery)
      return {
        name,
        amount: randomAmount(),
        date: day,
        account_id: hariCredit.accountId,
        category1: 'Shops',
        category2: 'Supermarkets and Groceries',
        userId: hari.id,
        lat,
        lon
      }
    }),
    ...doTimes(10).map(day => {
      const {name, lat, lon} = randomStore(shops)
      return {
        name,
        amount: randomBigAmount(),
        date: day,
        account_id: hariCredit.accountId,
        category1: 'Shops',
        category2: 'Clothing',
        userId: hari.id,
        lat,
        lon
      }
    }),
    {
      name: 'United Airlines',
      amount: 350,
      date: '2018-06-19',
      account_id: hariCredit.accountId,
      category1: 'Travel',
      category2: 'Airlines and Aviation Services',
      userId: hari.id
    },
    ...onceAMonth.map(day => {
      return {
        name: 'Netflix',
        amount: 12,
        date: day,
        account_id: hariCredit.accountId,
        category1: 'Service',
        category2: 'Entertainment',
        userId: hari.id
      }
    })
  ]

  const transactions = await Promise.all(
    allTransactions.map(transaction => Transaction.create(transaction))
  )

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${transactions.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
