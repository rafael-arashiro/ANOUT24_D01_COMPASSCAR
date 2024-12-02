const ValidationError = require('../errors/ValidationError')

module.exports = (app) => {
  // ----------------------> Get list of cars
  const findCars = async (filter, page, limit) => {
    let data
    let carResponse
    let count
    let pages

    let offset = limit * page - limit

    let filterYear
    let filterPlate
    let filterBrand

    if (filter.year) filterYear = filter.year
    else filterYear = 0

    if (filter.plate) filterPlate = filter.plate

    if (filter.brand) filterBrand = filter.brand

    count = await app
      .db('cars')
      .where('year', '>=', filterYear)
      .modify((carQuery) => {
        if (filter.plate) {
          carQuery.andWhere('plate', 'LIKE', `%${filterPlate}`)
        }
      })
      .modify((carQuery) => {
        if (filter.brand) {
          carQuery.andWhere('brand', 'LIKE', `%${filterBrand}%`)
        }
      })
      .select('*')

    pages = Math.ceil(count.length / limit)

    data = await app
      .db('cars')
      .where('year', '>=', filterYear)
      .modify((carQuery) => {
        if (filter.plate) {
          carQuery.andWhere('plate', 'LIKE', `%${filterPlate}`)
        }
      })
      .modify((carQuery) => {
        if (filter.brand) {
          carQuery.andWhere('brand', 'LIKE', `%${filterBrand}%`)
        }
      })
      .orderBy('id')
      .select('*')
      .limit(limit)
      .offset(offset)

    carResponse = { count: count.length, pages: pages, data }

    return carResponse
  }

  // ----------------------> Get a car by id
  const findOneCar = async (id) => {
    const newCar = await app.db('cars').where({ id }).select('*')

    let items = await app.db('cars_items').where({ car_id: id }).pluck('name')

    const retorno = { ...newCar[0], items }

    return retorno
  }

  // ----------------------> Post a car
  const registerCar = async (car) => {
    await app.db('cars').insert({
      brand: car.brand,
      model: car.model,
      plate: car.plate,
      year: car.year,
      created_at: new Date()
    })

    return app.db('cars').where({ plate: car.plate })
  }

  // ----------------------> Put items in a car by ID
  const updateCarItems = async (id, name) => {
    //Update and return
    await app.db('cars_items').where({ car_id: id }).del()

    for (item in name)
      await app
        .db('cars_items')
        .insert({ name: name[item], car_id: id, date: new Date() })

    return app.db('cars_items').where({ car_id: id })
  }

  // ----------------------> Update a car
  const updateCar = async (id, car) => {
    return app.db('cars').where({ id }).update(car)
  }

  // ----------------------> Delete a car
  const deleteCar = async (id) => {
    await app.db('cars_items').where({ car_id: id }).del()

    return app.db('cars').where({ id }).del()
  }

  return {
    findCars,
    findOneCar,
    registerCar,
    updateCarItems,
    updateCar,
    deleteCar
  }
}
