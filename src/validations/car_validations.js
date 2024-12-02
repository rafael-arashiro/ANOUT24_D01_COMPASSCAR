const ValidationError = require('../errors/ValidationError')

// ----------------------> Car plates variables
let platePositions012 = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]
let platePositions467 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
let platePositions5 = platePositions012.concat(platePositions467)

// ----------------------> Car years variables
const currentYear = new Date().getFullYear() + 1
const minYear = new Date().getFullYear() - 9

module.exports = (app) => {
  const registerCarValidations = async (car) => {
    if (!car.brand) throw new ValidationError('brand is required')

    if (!car.model) throw new ValidationError('model is required')

    if (!car.year) throw new ValidationError('year is required')

    if (!car.plate) throw new ValidationError('plate is required')

    if (car.year < minYear || car.year > currentYear)
      throw new ValidationError('year must be between 2015 and 2025')

    if (
      car.plate.length != 8 ||
      platePositions012.indexOf(car.plate[0]) == -1 ||
      platePositions012.indexOf(car.plate[1]) == -1 ||
      platePositions012.indexOf(car.plate[2]) == -1 ||
      car.plate[3] != '-' ||
      platePositions467.indexOf(car.plate[4]) == -1 ||
      platePositions5.indexOf(car.plate[5]) == -1 ||
      platePositions467.indexOf(car.plate[6]) == -1 ||
      platePositions467.indexOf(car.plate[7]) == -1
    )
      throw new ValidationError('plate must be in the correct format ABC-1C34')

    const carVerify = await app.db('cars').where({ plate: car.plate })
    if (carVerify.length > 0)
      throw new ValidationError('car already registered')
  }

  const findOneCarValidations = async (id) => {
    const car = await app.db('cars').where({ id })
    if (car.length < 1) {
      throw new ValidationError('car not found')
    }
  }

  const updateCarItemsValidations = async (id, name) => {
    if (!Array.isArray(name) || name.length == 0)
      throw new ValidationError('items is required')

    if (name.length > 5)
      throw new ValidationError('items must be a maximum of 5')

    let nameArray = Array.from(new Set(name))
    if (name.length > 1 && name.length != nameArray.length)
      throw new ValidationError('items cannot be repeated')

    const searchCar = await app.db('cars').where({ id })
    if (searchCar.length < 1) throw new ValidationError('car not found')
  }

  const updateCarValidations = async (id, car) => {
    const searchCar = await app.db('cars').where({ id })
    if (searchCar.length < 1) throw new ValidationError('car not found')

    if (car.brand)
      if (!car.model) throw new ValidationError('model must also be informed')

    if (car.year)
      if (car.year < minYear || car.year > currentYear)
        throw new ValidationError('year must be between 2015 and 2025')

    if (car.plate) {
      let carPlateSearch
      carPlateSearch = await app.db('cars').where({ plate: car.plate })
      if (carPlateSearch.length > 0)
        throw new ValidationError('car already registered')
    }

    if (car.plate)
      if (
        car.plate.length != 8 ||
        platePositions012.indexOf(car.plate[0]) == -1 ||
        platePositions012.indexOf(car.plate[1]) == -1 ||
        platePositions012.indexOf(car.plate[2]) == -1 ||
        car.plate[3] != '-' ||
        platePositions467.indexOf(car.plate[4]) == -1 ||
        platePositions5.indexOf(car.plate[5]) == -1 ||
        platePositions467.indexOf(car.plate[6]) == -1 ||
        platePositions467.indexOf(car.plate[7]) == -1
      )
        throw new ValidationError(
          'plate must be in the correct format ABC-1C34'
        )
  }

  const deleteCarValidations = async (id) => {
    let car = await app.db('cars').where({ id })
    if (car.length < 1) throw new ValidationError('car not found')
  }

  return {
    registerCarValidations,
    findOneCarValidations,
    updateCarItemsValidations,
    updateCarValidations,
    deleteCarValidations
  }
}
