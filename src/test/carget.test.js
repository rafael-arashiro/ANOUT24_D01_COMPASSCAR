const request = require('supertest')

const app = require('../app')

const MAIN_ROUTE = '/api/v1/cars'

let date = new Date()
date.setMilliseconds(0)
date.setSeconds(0)

let model_car = {
  brand: 'Marca Get',
  model: 'Modelo Get',
  year: 2022,
  plate: 'CBA-4T56',
  created_at: date.toISOString()
}

let model_car2 = {
  brand: 'Marca Get',
  model: 'Modelo Get',
  year: 2022,
  plate: 'POT-3M21',
  created_at: date.toISOString()
}

let model_items = ['Air Conditioning', 'Auto Lock', 'Power Electric Window']

let newCar

// test('Get car by ID', async () => {
//   // Delete old car
//   await app
//     .db('cars_items')
//     .join('cars', 'cars_items.car_id', '=', 'cars.id')
//     .where({ plate: 'CBA-4T56' })
//     .del()

//   await app.db('cars').where({ plate: 'CBA-4T56' }).del()

//   // Create car and items before the get (trought the route)
//   let newId
//   newCar = await request(app)
//     .post(MAIN_ROUTE)
//     .send(model_car)
//     .then((response) => {
//       newId = response.body.id
//       expect(response.status).toBe(201)
//     })
//   await request(app)
//     .put(`${MAIN_ROUTE}/${newId}/items`)
//     .send(model_items)
//     .then((response) => expect(response.status).toBe(204))

//   return await request(app)
//     .get(`${MAIN_ROUTE}/${newId}`)
//     .then((response) => {
//       expect(response.status).toBe(200)
//       expect(response.body).toHaveProperty('id')
//       expect(response.body).toStrictEqual({
//         id: newId,
//         brand: model_car.brand,
//         model: model_car.model,
//         year: model_car.year,
//         plate: model_car.plate,
//         created_at: model_car.created_at,
//         items: ['Air Conditioning', 'Auto Lock', 'Power Electric Window']
//       })
//     })
// })

// test('Get car by ID without items', async () => {
//   // Delete old car
//   await app
//     .db('cars_items')
//     .join('cars', 'cars_items.car_id', '=', 'cars.id')
//     .where({ plate: 'POT-3M21' })
//     .del()

//   await app.db('cars').where({ plate: 'POT-3M21' }).del()

//   // Create car and items before the get (trought the route)
//   let newId
//   newCar = await request(app)
//     .post(MAIN_ROUTE)
//     .send(model_car2)
//     .then((response) => {
//       newId = response.body.id
//       expect(response.status).toBe(201)
//     })

//   return await request(app)
//     .get(`${MAIN_ROUTE}/${newId}`)
//     .then((response) => {
//       expect(response.status).toBe(200)
//       expect(response.body).toStrictEqual({
//         id: newId,
//         brand: model_car2.brand,
//         model: model_car2.model,
//         year: model_car2.year,
//         plate: model_car2.plate,
//         created_at: model_car2.created_at,
//         items: []
//       })
//     })
// })

// test('Get car with wrong ID', async () => {
//   return request(app)
//     .get(`${MAIN_ROUTE}/99`)
//     .then((response) => {
//       expect(response.status).toBe(404)
//       expect(response.body.error).toBe('car not found')
//     })
// })

describe('List cars', () => {
  beforeAll(async () => {
    await app.db.seed.run()
  })

  date = new Date()
  date.setMilliseconds(0)
  date.setSeconds(0)

  const template = (newData, resposta) => {
    return request(app)
      .get(MAIN_ROUTE)
      .send(newData)
      .then((result) => {
        expect(result.status).toBe(200)
        expect(result.body).toStrictEqual(resposta)
      })
  }

  test('Without params', async () =>
    template('', {
      count: 31,
      pages: 7,
      data: [
        {
          id: 10001,
          brand: 'Fusca',
          model: 'Small ball',
          year: 2016,
          plate: 'LMN-9A23',
          created_at: date.toISOString()
        },
        {
          id: 10002,
          brand: 'Brasilia',
          model: 'No new model',
          year: 2019,
          plate: 'YUI-1G21',
          created_at: date.toISOString()
        },
        {
          id: 10003,
          brand: 'Ferrari',
          model: 'Red',
          year: 2024,
          plate: 'QWX-3L24',
          created_at: date.toISOString()
        },
        {
          id: 10004,
          brand: 'Bug',
          model: 'Bug Bug',
          year: 2018,
          plate: 'TGH-6797',
          created_at: date.toISOString()
        },
        {
          id: 10005,
          brand: 'Gurgel',
          model: 'Eletric',
          year: 2022,
          plate: 'AAA-0A00',
          created_at: date.toISOString()
        }
      ]
    }))

  test('Optional year', () =>
    template(
      { year: 2020 },
      {
        count: 24,
        pages: 5,
        data: [
          {
            id: 10003,
            brand: 'Ferrari',
            model: 'Red',
            year: 2024,
            plate: 'QWX-3L24',
            created_at: date.toISOString()
          },
          {
            id: 10005,
            brand: 'Gurgel',
            model: 'Eletric',
            year: 2022,
            plate: 'AAA-0A00',
            created_at: date.toISOString()
          },
          {
            id: 10006,
            brand: 'Fuscão',
            model: 'Big ball',
            year: 2023,
            plate: 'III-6186',
            created_at: date.toISOString()
          },
          {
            id: 10007,
            brand: 'Limousine',
            model: 'Small Limo',
            year: 2024,
            plate: 'PSD-6Q22',
            created_at: date.toISOString()
          },
          {
            id: 10009,
            brand: 'Porsche',
            model: 'Carrera',
            year: 2021,
            plate: 'POP-7777',
            created_at: date.toISOString()
          }
        ]
      }
    ))

  test('Optional plate', () =>
    template(
      { plate: 'FHR-2461' },
      {
        count: 8,
        pages: 2,
        data: [
          {
            id: 10002,
            brand: 'Brasilia',
            model: 'No new model',
            year: 2019,
            plate: 'YUI-1G21',
            created_at: date.toISOString()
          },
          {
            id: 10010,
            brand: 'Marauder',
            model: 'Viper Mackay',
            year: 2022,
            plate: 'LOL-0101',
            created_at: date.toISOString()
          },
          {
            id: 10013,
            brand: 'Battle Trak',
            model: 'Roadkill Kelly',
            year: 2022,
            plate: 'ABA-3641',
            created_at: date.toISOString()
          },
          {
            id: 10023,
            brand: 'Number 6',
            model: 'The Army Surplus Special',
            year: 2020,
            plate: 'CAL-0011',
            created_at: date.toISOString()
          },
          {
            id: 10025,
            brand: 'Number 8',
            model: 'The Arkansas Chuggabug',
            year: 2020,
            plate: 'GFH-6341',
            created_at: date.toISOString()
          }
        ]
      }
    ))

  test('Optional brand', () =>
    template(
      { brand: 'Numb' },
      {
        count: 11,
        pages: 3,
        data: [
          {
            id: 10018,
            brand: 'Number 1',
            model: 'The Boulder Mobile',
            year: 2020,
            plate: 'TRE-8547',
            created_at: date.toISOString()
          },
          {
            id: 10019,
            brand: 'Number 2',
            model: 'The Creepy Coupe',
            year: 2020,
            plate: 'HJK-7456',
            created_at: date.toISOString()
          },
          {
            id: 10020,
            brand: 'Number 3',
            model: 'The Convert-a-Car',
            year: 2020,
            plate: 'DSA-7875',
            created_at: date.toISOString()
          },
          {
            id: 10021,
            brand: 'Number 4',
            model: 'The Crimson Haybailer',
            year: 2020,
            plate: 'UIO-8126',
            created_at: date.toISOString()
          },
          {
            id: 10022,
            brand: 'Number 5',
            model: 'The Compact Pussycat',
            year: 2020,
            plate: 'MNB-3572',
            created_at: date.toISOString()
          }
        ]
      }
    ))

  test('Optional page', () =>
    template(
      { page: 4 },
      {
        count: 31,
        pages: 7,
        data: [
          {
            id: 10016,
            brand: 'Kart',
            model: 'Mario',
            year: 2021,
            plate: 'QWE-2516',
            created_at: date.toISOString()
          },
          {
            id: 10017,
            brand: 'Kart',
            model: 'Luigi',
            year: 2021,
            plate: 'CCC-8D53',
            created_at: date.toISOString()
          },
          {
            id: 10018,
            brand: 'Number 1',
            model: 'The Boulder Mobile',
            year: 2020,
            plate: 'TRE-8547',
            created_at: date.toISOString()
          },
          {
            id: 10019,
            brand: 'Number 2',
            model: 'The Creepy Coupe',
            year: 2020,
            plate: 'HJK-7456',
            created_at: date.toISOString()
          },
          {
            id: 10020,
            brand: 'Number 3',
            model: 'The Convert-a-Car',
            year: 2020,
            plate: 'DSA-7875',
            created_at: date.toISOString()
          }
        ]
      }
    ))

  test('Optional limit', () =>
    template(
      { limit: 3 },
      {
        count: 31,
        pages: 11,
        data: [
          {
            id: 10001,
            brand: 'Fusca',
            model: 'Small ball',
            year: 2016,
            plate: 'LMN-9A23',
            created_at: date.toISOString()
          },
          {
            id: 10002,
            brand: 'Brasilia',
            model: 'No new model',
            year: 2019,
            plate: 'YUI-1G21',
            created_at: date.toISOString()
          },
          {
            id: 10003,
            brand: 'Ferrari',
            model: 'Red',
            year: 2024,
            plate: 'QWX-3L24',
            created_at: date.toISOString()
          }
        ]
      }
    ))

  test('Optional page and limit', () =>
    template(
      { page: 3, limit: 6 },
      {
        count: 31,
        pages: 6,
        data: [
          {
            id: 10013,
            brand: 'Battle Trak',
            model: 'Roadkill Kelly',
            year: 2022,
            plate: 'ABA-3641',
            created_at: date.toISOString()
          },
          {
            id: 10014,
            brand: 'Havac',
            model: 'Butcher Icebone',
            year: 2022,
            plate: 'NBA-6V22',
            created_at: date.toISOString()
          },
          {
            id: 10015,
            brand: 'Havac',
            model: 'J.B Slash',
            year: 2022,
            plate: 'TDD-4738',
            created_at: date.toISOString()
          },
          {
            id: 10016,
            brand: 'Kart',
            model: 'Mario',
            year: 2021,
            plate: 'QWE-2516',
            created_at: date.toISOString()
          },
          {
            id: 10017,
            brand: 'Kart',
            model: 'Luigi',
            year: 2021,
            plate: 'CCC-8D53',
            created_at: date.toISOString()
          },
          {
            id: 10018,
            brand: 'Number 1',
            model: 'The Boulder Mobile',
            year: 2020,
            plate: 'TRE-8547',
            created_at: date.toISOString()
          }
        ]
      }
    ))

  test('All optionals', () =>
    template(
      { year: 2017, plate: 'ABA-3641', brand: 'B', page: 2, limit: 1 },
      {
        count: 2,
        pages: 2,
        data: [
          {
            id: 10013,
            brand: 'Battle Trak',
            model: 'Roadkill Kelly',
            year: 2022,
            plate: 'ABA-3641',
            created_at: date.toISOString()
          }
        ]
      }
    ))
})
