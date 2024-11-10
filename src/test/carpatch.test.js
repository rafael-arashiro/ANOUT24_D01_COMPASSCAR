const request = require('supertest')

const app = require('../app')

const MAIN_ROUTE = '/api/v1/cars'

let date = new Date()
date.setMilliseconds(0)
date.setSeconds(0)

let model_car = {
  brand: 'Marca Patch',
  model: 'Modelo Patch',
  year: 2023,
  plate: 'NPC-6H24',
  created_at: date.toISOString()
}

let newCar
let newId

test('Put test', async () => {
  // Delete old car
  await app
    .db('cars_items')
    .join('cars', 'cars_items.car_id', '=', 'cars.id')
    .where({ plate: 'NPC-6H24' })
    .del()

  await app.db('cars').where({ plate: 'NPC-6H24' }).del()

  // Create car and items before the get (trought the route)

  newCar = await request(app)
    .post(MAIN_ROUTE)
    .send(model_car)
    .then((response) => {
      newId = response.body.id
      expect(response.status).toBe(201)
    })

  return request(app)
    .patch(`${MAIN_ROUTE}/${newId}`)
    .send({ Model: 'Model Patch Dois' })
    .then((response) => {
      expect(response.status).toBe(204)
    })
})

test('Put test with wrong ID', () => {
  return request(app)
    .patch(`${MAIN_ROUTE}/-1`)
    .send({ model: 'Model Patch Dois' })
    .then((response) => {
      expect(response.status).toBe(404)
    })
})

test('Put test with brand and without model', () => {
  return request(app)
    .patch(`${MAIN_ROUTE}/${newId}`)
    .send({ brand: 'Marca Patch Dois' })
    .then((response) => {
      expect(response.status).toBe(400)
    })
})

test('Put test with wrong year', () => {
  return request(app)
    .patch(`${MAIN_ROUTE}/${newId}`)
    .send({ year: 1500 })
    .then((response) => {
      expect(response.status).toBe(400)
    })
})

describe('Post test with a plate with wrong values', () => {
  const template = (newData, errorMessage) => {
    return request(app)
      .patch(`${MAIN_ROUTE}/${newId}`)
      .send(newData)
      .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe(errorMessage)
      })
  }

  test('Wrong number of characters', () =>
    template(
      { plate: 'ABC-1D2' },
      'plate must be in the correct format ABC-1C34'
    ))

  test('0 value', () =>
    template(
      { plate: '1BC-1D23' },
      'plate must be in the correct format ABC-1C34'
    ))
  test('1 value', () =>
    template(
      { plate: 'A1C-1D23' },
      'plate must be in the correct format ABC-1C34'
    ))
  test('2 value', () =>
    template(
      { plate: 'AB1-1D23' },
      'plate must be in the correct format ABC-1C34'
    ))
  test('3 value', () =>
    template(
      { plate: 'ABCA1D23' },
      'plate must be in the correct format ABC-1C34'
    ))
  test('4 value', () =>
    template(
      { plate: 'ABC-AD23' },
      'plate must be in the correct format ABC-1C34'
    ))
  test('5 value', () =>
    template(
      { plate: 'ABC-1-23' },
      'plate must be in the correct format ABC-1C34'
    ))
  test('6 value', () =>
    template(
      { plate: 'ABC-1DA3' },
      'plate must be in the correct format ABC-1C34'
    ))
  test('7 value', () =>
    template(
      { plate: 'ABC-1D2A' },
      'plate must be in the correct format ABC-1C34'
    ))
})

test('Put test with plate already registered', () => {
  return request(app)
    .patch(`${MAIN_ROUTE}/${newId}`)
    .send({ plate: 'NPC-6H24' })
    .then((response) => {
      expect(response.status).toBe(409)
      expect(response.body.error).toBe('car already registered')
    })
})
