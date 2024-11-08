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

  const findOneCar = async (id) => {
    const car = await app.db('cars').where({ id })
    if (car.length < 1) throw new ValidationError('car not found')

    let carAndItems = app
      .db('cars')
      .where({ 'cars.id': id })
      .join('cars_items', 'cars.id', '=', 'cars_items.car_id')
      .select('cars.id', 'brand', 'model', 'year', 'plate', 'created_at')

    console.log(carAndItems)

    return carAndItems
  }

  // Post car
  const registerCar = async (car) => {
    //Validation errors
    if (!car.brand) throw new ValidationError('brand is required')

    if (!car.model) throw new ValidationError('model is required')

    if (!car.year) throw new ValidationError('year is required')

    if (!car.plate) throw new ValidationError('plate is required')

    if (car.year < 2015 || car.year > 2025)
      throw new ValidationError('year must be between 2015 and 2025')

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

    console.log(car)
    await app.db('cars').insert({
      brand: car.brand,
      model: car.model,
      plate: car.plate,
      year: car.year,
      created_at: new Date()
    })

    return await app.db('cars').where({ plate: car.plate })
  }

  // Put items by id
  const updateCarItems = async (id, name) => {
    // Validation erros
    if (!Array.isArray(name) || name.length == 0)
      throw new ValidationError('items is required')

    if (name.length > 5)
      throw new ValidationError('items must be a maximum of 5')

    let nameArray = Array.from(new Set(name))
    if (name.length > 1 && name.length != nameArray.length)
      throw new ValidationError('items cannot be repeated')

    const searchCar = await app.db('cars').where({ id })
    if (searchCar.length < 1) throw new ValidationError('car not found')

    //Update and return
    await app.db('cars_items').where({ car_id: id }).del()

    for (item in name)
      await app
        .db('cars_items')
        .insert({ name: name[item], car_id: id, date: new Date() })

    return await app.db('cars_items').where({ car_id: id })
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
