const ValidationError = require('../errors/ValidationError')

module.exports = (app) => {
  const findCars = () => {
    return app.db('cars')
  }

  const findOneCar = (brand, model, plate, year) => {
    return app.db('cars').where({ brand, model, plate, year })
  }

  const registerCar = async (car) => {
    if (!car.brand) throw new ValidationError('brand is required')

    if (!car.model) throw new ValidationError('model is required')

    if (!car.year) throw new ValidationError('year is required')

    if (!car.plate) throw new ValidationError('plate is required')

    if (car.year < 2015 || car.year > 2025)
      throw new ValidationError('year must be between 2015 and 2025')

    // if (
    //   typeof car.plate[0] === 'string' &&
    //   typeof car.plate[1] === 'string' &&
    //   typeof car.plate[2] === 'string' &&
    //   car.plate[3] === '-' &&
    //   typeof car.plate[4] === 'number' &&
    //   (typeof car.plate[5] === 'string' || typeof car.plate[5] === 'number') &&
    //   typeof car.plate[6] === 'number' &&
    //   typeof car.plate[7] === 'number'
    // )
    //   throw new ValidationError('plate must be in the correct format ABC-1C34')

    if (findOneCar(car.brand, car.model, car.plate, car.year))
      throw new ValidationError('car already registered')
    await app.db('cars').insert(car)

    return await app.db('cars').where({
      brand: car.brand,
      model: car.model,
      plate: car.plate,
      year: car.year
    })
  }

  return { findCars, registerCar }
}
