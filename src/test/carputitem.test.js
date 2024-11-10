const request = require('supertest')

const app = require('../app')

const MAIN_ROUTE = '/api/v1/cars'

let model_car = {
  brand: 'Marca Put',
  model: 'Modelo Put',
  year: 2022,
  plate: 'CBA-4T56',
  created_at: new Date()
}

let model_items = ['Air Conditioning', 'Auto Lock', 'Power Electric Window']

let newCar

test('Update car items', async () => {
  newCar = await app.db('cars').insert(model_car)
  return request(app)
    .put(`${MAIN_ROUTE}/${newCar[0]}/items`)
    .send(model_items)
    .then((response) => {
      expect(response.status).toBe(204)
    })
})

test('Update car items for another item', async () => {
  return request(app)
    .put(`${MAIN_ROUTE}/${newCar[0]}/items`)
    .send(['Window Film'])
    .then((response) => {
      expect(response.status).toBe(204)
    })
})

test('Update items without body', async () => {
  return request(app)
    .put(`${MAIN_ROUTE}/${newCar[0]}/items`)
    .send()
    .then((response) => {
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('items is required')
    })
})

describe('Update items with wrong values', () => {
  let validInput
  beforeAll(() => {
    validInput = ['Air Conditioning', 'Auto Lock', 'Power Electric Window']
  })

  const template = (newData, errorMessage) => {
    return request(app)
      .put(`${MAIN_ROUTE}/${newCar[0]}/items`)
      .send(newData)
      .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe(errorMessage)
      })
  }

  test('With an empty array', () => template('', 'items is required'))

  test('With an empty array', () => template([], 'items is required'))

  test('With more than 5 items', () =>
    template(
      [
        'Air Conditioning',
        'Auto Lock',
        'Power Electric Window',
        'Awesome Keychain',
        'Leather Sits',
        'Window Film'
      ],
      'items must be a maximum of 5'
    ))

  test('With repeated items', () =>
    template(
      ['Air Conditioning', 'Air Conditioning'],
      'items cannot be repeated'
    ))
})

test('Update items with wrong ID', async () => {
  return request(app)
    .put(`${MAIN_ROUTE}/123456789/items`)
    .send(['Air Conditioning', 'Auto Lock', 'Power Electric Window'])
    .then((response) => {
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('car not found')
    })
})
