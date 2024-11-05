exports.up = async (knex) => {
  await knex.schema.createTable('cars', (t) => {
    t.increments('id').primary()
    t.string('brand').notNull()
    t.string('model').notNull()
    t.string('plate').notNull()
    t.integer('year').notNull()
  })
  await knex.schema.createTable('cars_items', (t) => {
    t.increments('id').primary()
    t.string('name').notNull()
    t.integer('car_id').references('id').inTable('cars').notNull()
    t.datetime('date').notNull()
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('cars_items')
  await knex.schema.dropTable('cars')
}
