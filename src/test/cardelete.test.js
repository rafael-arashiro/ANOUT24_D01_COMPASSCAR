const request = require('supertest')

const app = require('../app')

const MAIN_ROUTE = '/api/v1/cars'

let model_car = {
  brand: 'Marca Delete',
  model: 'Modelo Delete',
  year: 2023,
  plate: 'TIL-9Z90'
}

let model_items = ['Air Conditioning', 'Auto Lock', 'Power Electric Window']

test('Delete test', async () => {
  // Delete old car
  await app
    .db('cars_items')
    .join('cars', 'cars_items.car_id', '=', 'cars.id')
    .where({ plate: 'TIL-9Z90' })
    .del()

  await app.db('cars').where({ plate: 'TIL-9Z90' }).del()

  // Create car and items before the delete (trought the route)
  let newId
  await request(app)
    .post(MAIN_ROUTE)
    .send(model_car)
    .then((response) => {
      newId = response.body.id
      expect(response.status).toBe(201)
    })
  await request(app)
    .put(`${MAIN_ROUTE}/${newId}/items`)
    .send(model_items)
    .then((response) => expect(response.status).toBe(204))

  // Delete test
  return request(app)
    .delete(`${MAIN_ROUTE}/${newId}`)
    .then((response) => {
      expect(response.status).toBe(204)
    })
})

test('Delete test with the wrong ID', () => {
  return request(app)
    .delete(`${MAIN_ROUTE}/-1`)
    .then((response) => {
      expect(response.status).toBe(404)
    })
})
