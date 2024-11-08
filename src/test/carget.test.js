const request = require('supertest')

const app = require('../app')

const MAIN_ROUTE = '/api/v1/cars'

let model_car = {
  brand: 'Marca Put',
  model: `Modelo Put ${new Date()}`,
  year: 2022,
  plate: 'CBA-4T56',
  created_at: new Date()
}

let newCar

test('Get car by ID', async () => {
  newCar = await app.db('cars').insert(model_car)
  return request(app)
    .get(`${MAIN_ROUTE}/${newCar[0]}`)
    .then((result) => {
      expect(result.status).toBe(200)
      expect(result.body).toBe({
        id: result.id,
        brand: result.brand,
        model: result.model,
        year: result.year,
        plate: result.plate,
        created_at: result.created_at,
        items: result.items
      })
    })
})
