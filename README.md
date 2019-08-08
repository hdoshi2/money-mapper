# Money-Mapper

The Problem: Obtaining a comprehensive picture of users' financial health is often times difficult when they have accounts with multiple financial institutions.

The Solution: Developed a personal finance application that consolidates financial data from multiple sources and categorizes transaction data using the PLAID API.

* Implemented D3js to produce a dynamic and interactive pie chart that categorizes expenditures in a visually appealing manner.

* Implemented MapBox API for a fun twist to dynamically link PLAID API data and view expense occurrences on a map.

[Video Demo](https://youtu.be/WE6O-5G8qlU)

![Logo](https://postimg.cc/Hrdnj6Mw)

## Developer Contact

* Hari Doshi
  * [Github](https://github.com/hdoshi2)
  * [LinkedIn](https://twitter.com/Kidrah9)
  * [Twitter](https://www.linkedin.com/in/hdoshi2/)

## Getting Started

### Prerequisites

In order to run this application on your device, download [Expo Client](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8).

Register with [Plaid's](https://plaid.com/) API to get a public key client secret and client ID.

### Front End

`npm install`
or
`yarn install`

`REACT_NATIVE_ENV=production npm run`

### Back End

[GitHub Repo](https://github.com/hdoshi2/money-mapper)

`npm install`
or
`yarn install`

`npm start`

### Logging In

To explore the features as an existing user, use the following credentials:

* **User:** guest@email.com
* **Password:** 1234

To sign up as a new user in sandbox mode when you've reached the Plaid authentication screen, choose a bank and use the following credentials:

* **User:** user_good
* **Password:** pass_good

## Technologies Used

* [React-Native](https://facebook.github.io/react-native/)
* [Redux](https://redux.js.org/)
* [D3](https://d3js.org/)
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [PostgresSQL](https://www.postgresql.org/) and [Sequelize](http://docs.sequelizejs.com/)

## Features

* Displays current account and transactions data via third party API, Plaid
* Data visualization for remaining spendable, spending by category
* Financial Personality Quiz to personalize budget tracking
* Recommended Articles based on financial personality type
* Streaks for progress and habit tracking
* Set Daily, weekly, bi-weekly reminders to check-in to the app via push notifications
* Update individual transaction category and toggle to include/exclude from budgeted spending
