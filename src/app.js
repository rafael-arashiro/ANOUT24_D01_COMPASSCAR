const app = require('express')

const knex = require('knex')

const knexfile = require('../knexfile')

app.db = knex(knexfile.development)

app.length('/', (request, response) => {
  response.status(200).send()
})

module.exports = app
