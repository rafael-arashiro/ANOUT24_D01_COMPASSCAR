const express = require('express')

module.exports = (app) => {
  const protectedRouter = express.Router()

  protectedRouter.use('/cars', app.routes.cars)

  app.use('/api/v1', protectedRouter)
}
