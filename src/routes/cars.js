const express = require('express')
const { request, response } = require('../app')

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
        console.log(err)
        next(err)
      })
  })

  router.post('/', (request, response, next) => {
    app.services.car
      .registerCar(request.body)
      .then((result) => response.status(201).json(result[0]))
      .catch((err) => next(err))
  })

  router.put('/:id/items', (request, response, next) => {
    app.services.car
      .updateCarItems(request.params.id, request.body)
      .then((result) => response.status(204).send())
      .catch((err) => {
        if (err.message == 'car not found') response.status(404).json(err)
        next(err)
      })
  })

  router.get('/:id', (request, response, next) => {
    app.services.car
      .findOneCar(request.params.id)
      .then((result) => response.status(200).json(result))
      .catch((err) => {
        if (err.message == 'car not found') response.status(404).json(err)
        next(err)
      })
  })

  router.patch('/:id', (request, response, next) => {
    app.services.car
      .updateCar(request.params.id, request.body)
      .then((result) => response.status(204).send())
      .catch((err) => next(err))
  })

  router.delete('/:id', (request, response, next) => {
    app.services.car
      .deleteCar(request.params.id)
      .then((result) => response(204).send())
      .catch((err) => next(err))
  })

  return router
}
