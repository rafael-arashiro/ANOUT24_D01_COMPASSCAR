const ValidationError = require('../errors/ValidationError')

module.exports = (app) => {
  const findCars = () => {
    return app.db('cars')
  }

  const findOneCar = (brand, model, plate, year) => {
    return app.db('cars').where({ brand, model, plate, year })
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

    if (findOneCar(car.brand, car.model, car.plate, car.year))
      throw new ValidationError('car already registered')

    await app.db('cars').insert(car)

    return app.db('cars').where(car)
  }

  const updateCarItems = (id, items) => {
    //Validation erros
    if (!items) throw new ValidationError('items is required')

    if (items.length > 5)
      throw new ValidationError('items must be a maximum of 5')

    const itemSet = new Set(items)
    if (items.length != itemSet.length)
      throw new ValidationError('items cannot be repeated')

    //Update car items
    return app.db('car_items').where({ car_id: id }).update(items)
  }

  return { findCars, registerCar, updateCarItems }
}
