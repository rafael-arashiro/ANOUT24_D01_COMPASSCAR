const express = require('express')
const { request, response } = require('../app')

module.exports = (app) => {
  const router = express.Router()

  router.get('/', (request, response, next) => {
    app.services.car
      .findCars()
      .then((result) => response.status(200).json(result))
      .catch((err) => next(err))
  })

  router.post('/', (request, response, next) => {
    app.services.car
      .registerCar(request.body)
      .then((result) => response.status(201).json(result[0]))
      .catch((err) => next(err))
  })

  router.put('/:id/items', (request, response, next) => {
    app.services.car
      .updateCarItems(request.body.id)
      .then(() => response.status(204).send())
      .catch((err) => next(err))
  })

  return router
}
