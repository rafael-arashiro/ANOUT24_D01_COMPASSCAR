const express = require('express')
const { request, response } = require('../app')
const ValidationError = require('../errors/ValidationError')

module.exports = (app) => {
  const router = express.Router()

  router.get('/', (request, response, next) => {
    let page
    if (request.body.page) page = request.body.page
    else page = 1

    let limit

    if (!request.body.limit || request.body.limit < 1) limit = 5
    else if (request.body.limit > 10) limit = 10
    else limit = request.body.limit

    let filter = request.body

    app.services.car
      .findCars(filter, page, limit)
      .then((result) => response.status(200).json(result))
      .catch((err) => {
        next(err)
      })
  })

  router.post('/', (request, response, next) => {
    app.validations.car_validations
      .registerCarValidations(request.body)
      .then(() =>
        app.services.car
          .registerCar(request.body)
          .then((result) => response.status(201).json(result[0]))
      )
      .catch((err) => next(err))
  })

  router.put('/:id/items', (request, response, next) => {
    app.validations.car_validations
      .updateCarItemsValidations(request.params.id, request.body)
      .then(() =>
        app.services.car
          .updateCarItems(request.params.id, request.body)
          .then(() => response.status(204).send())
      )
      .catch((err) => {
        if (err.message == 'car not found')
          response.status(404).json({ error: err.message })
        next(err)
      })
  })

  router.get('/:id', (request, response, next) => {
    app.validations.car_validations
      .findOneCarValidations(request.params.id)
      .then(() =>
        app.services.car
          .findOneCar(request.params.id)
          .then((result) => response.status(200).json(result))
      )
      .catch((err) => {
        if (err.message == 'car not found')
          response.status(404).json({ error: err.message })
        next(err)
      })
  })

  router.patch('/:id', (request, response, next) => {
    app.validations.car_validations
      .updateCarValidations(request.params.id, request.body)
      .then(() =>
        app.services.car
          .updateCar(request.params.id, request.body)
          .then(() => response.status(204).send())
      )
      .catch((err) => {
        if (err.message == 'car not found')
          response.status(404).json({ error: err.message })
        if (err.message == 'car already registered')
          response.status(409).json({ error: err.message })
        else next(err)
      })
  })

  router.delete('/:id', (request, response, next) => {
    app.validations.car_validations
      .deleteCarValidations(request.params.id)
      .then(() =>
        app.services.car
          .deleteCar(request.params.id)
          .then(() => response.status(204).send())
      )
      .catch((err) => {
        if (err.message == 'car not found')
          response.status(404).json({ error: err.message })
        next(err)
      })
  })

  return router
}
