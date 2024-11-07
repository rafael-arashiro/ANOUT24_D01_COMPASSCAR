const request = require('supertest')

const app = require('../app')

const MAIN_ROUTE = '/api/v1/cars'

let model_car = {
  brand: 'Marca',
  model: `Modelo ${new Date()}`,
  year: 2018,
  plate: 'ABC-1D23'
}

test('Post test', async () => {
  await app.db('cars').del()
  return request(app)
    .post(MAIN_ROUTE)
    .send({
      brand: 'Nova Marca',
      model: 'Novo Modelo',
      plate: 'ABC-1D24',
      year: 2020
    })
    .then((result) => {
      expect(result.status).toBe(201)
      expect(result.body.brand).toBe('Nova Marca')
      expect(result.body.model).toBe('Novo Modelo')
      expect(result.body.plate).toBe('ABC-1D24')
      expect(result.body.year).toBe(2020)
    })
})

describe('Post test with missing values', () => {
  let validInput
  beforeAll(() => {
    validInput = {
      brand: 'Marca',
      model: 'Modelo',
      year: 2018,
      plate: 'ABC-1D23'
    }
  })

  const template = (newData, errorMessage) => {
    return request(app)
      .post(MAIN_ROUTE)
      .send({ ...validInput, ...newData })
      .then((result) => {
        expect(result.status).toBe(400)
        expect(result.body.error).toBe(errorMessage)
      })
  }

  test('Missing brand', () => template({ brand: null }, 'brand is required'))
  test('Missing model', () => template({ model: null }, 'model is required'))
  test('Missing year', () => template({ year: null }, 'year is required'))
  test('Missing plate', () => template({ plate: null }, 'plate is required'))
})

test('Post test with cars older than 10 years', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({
      brand: 'Marca',
      model: 'Modelo Velho',
      year: 2014,
      plate: 'ABC-1D23'
    })
    .then((result) => {
      expect(result.status).toBe(400)
      expect(result.body.error).toBe('year must be between 2015 and 2025')
    })
})

test('Post test of an existing car', async () => {
  await app.db('cars').insert(model_car)
  return request(app)
    .post(MAIN_ROUTE)
    .send(model_car)
    .then((result) => {
      expect(result.status).toBe(400)
      expect(result.body.error).toBe('car already registered')
    })
})
