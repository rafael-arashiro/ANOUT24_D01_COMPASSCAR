exports.up = async (knex) => {
  await knex.schema.createTable('cars_items', (t) => {
    t.increments('id').primary()
    t.string('name').notNull()
    t.integer('car_id').unsigned().references('id').inTable('cars')
    t.timestamp('date').defaultTo(knex.fn.now()).notNull()
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('cars_items')
}
