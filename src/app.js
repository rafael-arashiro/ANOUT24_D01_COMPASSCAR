const app = require('express')()

const consign = require('consign')

const knex = require('knex')

const knexfile = require('../knexfile')

app.db = knex(knexfile.development)

consign({ cwd: 'src', verbose: false })
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/router.js')
  .into(app)

app.get('/', (request, response) => {
  response.status(200).send()
})

app.use((err, request, response, next) => {
  const { name, message, stack } = err
  if (name === 'ValidationError') response.status(400).json({ error: message })
  else {
    response.status(500).send('an internal server error occurred')
  }
  next(err)
})

module.exports = app
