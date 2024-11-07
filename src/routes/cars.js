const express = require('express')
const { request, response } = require('../app')

module.exports = (app) => {
  const router = express.Router()

  router.get('/', (request, response, next) => {
    let page = request.params.page
    if (request.params.page) page = request.params.page
    else page = 1

    let limit
    if (!request.params || request.params.limit < 1) limit = 5
    else if (request.params.limit > 10) limit = 10
    else limit = request.params.limit

    if (request.params.year)
      app.services.car
        .findCars('year: year > request.params.year', page, limit)
        .then((result) => response.status(200).json(result))
        .catch((err) => next(err))
    else if ((request.params.final_plate, page, limit))
      app.services.car
        .findCars('plate: plate[7] == request.params.final_plate[7]')
        .then((result) => response.status(200).json(result))
        .catch((err) => next(err))
    else if ((request.params.brand, page, limit))
      app.services.car
        .findCars('brand: request.params.brand')
        .then((result) => response.status(200).json(result))
        .catch((err) => next(err))
    else
      app.services.car
        .findCars(null, page, limit)
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
      .updateCarItems(request.body.car_id, request.body)
      .then(() => response.status(204).send())
      .catch((err) => next(err))
  })

  router.get('/:id', (request, response, next) => {
    app.services.car
      .findOneCar(request.params.id)
      .then((result) => response.status(200).json(result))
      .catch((err) => next(err))
  })

  return router
}
