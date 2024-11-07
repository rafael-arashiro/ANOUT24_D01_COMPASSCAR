const ValidationError = require('../errors/ValidationError')

module.exports = (app) => {
  const findCars = (filter = {}, page, limit) => {
    let data
    let carResponse
    let count

    let pages

    if (!filter) count = app.db('cars').where(filter).length
    else count = app.db('cars').where(filter).length

    pages = Math.ceil(count / limit)

    if (!filter)
      data = app
        .db('cars')
        .join('cars', 'cars_items')
        .column(
          'cars.id',
          'brand',
          'model',
          'year',
          'plate',
          'date as created_at'
        )
        .limit(limit)
        .offset(page)
    data = app
      .db('cars')
      .where(filter)
      .join('cars', 'cars_items')
      .column(
        'cars.id',
        'brand',
        'model',
        'year',
        'plate',
        'date as created_at'
      )
      .limit(limit)
      .offset(page)

    carResponse.push({ count: count, pages: pages, data })

    return carResponse
  }

  const findOneCar = (id) => {
    const car = app.db('cars').where({ id })
    if (!car) throw new ValidationError('car not found')
    const carAndItems = app
      .db('cars')
      .where({ id })
      .join('cars', 'cars_items')
      .column(
        'cars.id',
        'brand',
        'model',
        'year',
        'plate',
        'date as created_at',
        'name as items'
      )
    return carAndItems
  }

  const registerCar = async (car) => {
    //Validation errors
    if (!car.brand) throw new ValidationError('brand is required')

    if (!car.model) throw new ValidationError('model is required')

    if (!car.year) throw new ValidationError('year is required')

    if (!car.plate) throw new ValidationError('plate is required')

    if (car.year < 2015 || car.year > 2025)
      throw new ValidationError('year must be between 2015 and 2025')

    if (
      typeof car.plate[0] === 'string' &&
      typeof car.plate[1] === 'string' &&
      typeof car.plate[2] === 'string' &&
      car.plate[3] === '-' &&
      typeof car.plate[4] === 'number' &&
      (typeof car.plate[5] === 'string' || typeof car.plate[5] === 'number') &&
      typeof car.plate[6] === 'number' &&
      typeof car.plate[7] === 'number'
    )
      throw new ValidationError('plate must be in the correct format ABC-1C34')

    const carVerify = await app.db('cars').where(car)
    if (carVerify.length > 0)
      throw new ValidationError('car already registered')

    await app.db('cars').insert(car)

    return await app.db('cars').where(car)
  }

  const updateCarItems = (id, items) => {
    //Validation erros
    if (!items || items.length == 0)
      throw new ValidationError('items is required')

    if (items.length > 5)
      throw new ValidationError('items must be a maximum of 5')

    const itemSet = new Set(items)
    if (items.length != itemSet.length)
      throw new ValidationError('items cannot be repeated')

    const searchCar = app.db('cars').where({ id })
    if (!searchCar) throw new ValidationError('car not found')
    //Update car items
    return app.db('car_items').where({ car_id: id }).update(items)
  }

  const updateCar = (id, car) => {
    const carFound = app.db('cars').where({ id })
    if (!carFound) throw new ValidationError('car not found')

    if (car.brand)
      if (!car.model) throw new ValidationError('model must also be informed')

    if (car.year)
      if (car.year < 2015 || car.year > 2025)
        throw new ValidationError('year must be between 2015 and 2025')

    if (car.plate)
      if (car.plate == carFound.id)
        throw new ValidationError('car already registered')

    if (
      typeof car.plate[0] === 'string' &&
      typeof car.plate[1] === 'string' &&
      typeof car.plate[2] === 'string' &&
      car.plate[3] === '-' &&
      typeof car.plate[4] === 'number' &&
      (typeof car.plate[5] === 'string' || typeof car.plate[5] === 'number') &&
      typeof car.plate[6] === 'number' &&
      typeof car.plate[7] === 'number'
    )
      throw new ValidationError('plate must be in the correct format ABC-1C34')

    return app.db('cars').where({ id }).update(car)
  }

  const deleteCar = (id) => {
    let car = app.db('cars').where({ id })
    if (!car) throw new ValidationError('car not found')

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
