const request = require('supertest')

const app = require('../app')

const MAIN_ROUTE = '/api/v1/cars'

let model_car = {
  brand: 'Marca',
  model: 'Modelo',
  year: 2018,
  plate: 'ABC-1D23'
}

test('Post test', async () => {
  await app.db('cars').where({ plate: model_car.plate }).del()
  return request(app)
    .post(MAIN_ROUTE)
    .send(model_car)
    .then((result) => {
      expect(result.status).toBe(201)
      expect(result.body.brand).toBe(model_car.brand)
      expect(result.body.model).toBe(model_car.model)
      expect(result.body.plate).toBe(model_car.plate)
      expect(result.body.year).toBe(model_car.year)
    })
})

describe('Post test with missing values', () => {
  let validInput
  beforeAll(() => {
    validInput = {
      brand: 'Marca',
      model: 'Modelo',
      year: 2018,
      plate: 'ABC-1D23',
      created_at: new Date()
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
      plate: 'ABC-1D23',
      created_at: new Date()
    })
    .then((result) => {
      expect(result.status).toBe(400)
      expect(result.body.error).toBe('year must be between 2015 and 2025')
    })
})

describe('Post test with a plate with wrong values', () => {
  let validInput
  beforeAll(() => {
    validInput = {
      brand: 'Marca Placa',
      model: 'Modelo Placa',
      year: 2024,
      plate: 'ABC-1D23',
      created_at: new Date()
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

test('Post test of an existing car', async () => {
  await app.db('cars').insert({
    brand: 'Marca Placa Repetida',
    model: 'Modelo Placa Repetido',
    year: 2021,
    plate: 'NTM-1F49',
    created_at: new Date()
  })
  return request(app)
    .post(MAIN_ROUTE)
    .send({
      brand: 'Marca Placa Repetida Dois',
      model: 'Modelo Placa Repetido Dois',
      year: 2022,
      plate: 'NTM-1F49',
      created_at: new Date()
    })
    .then((result) => {
      expect(result.status).toBe(400)
      expect(result.body.error).toBe('car already registered')
    })
})
