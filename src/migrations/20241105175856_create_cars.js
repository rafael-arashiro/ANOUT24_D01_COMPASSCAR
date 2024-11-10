exports.up = async (knex) => {
  await knex.schema.createTable('cars', (t) => {
    t.increments('id').primary()
    t.string('brand').notNull()
    t.string('model').notNull()
    t.string('plate').notNull()
    t.integer('year').notNull()
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull()
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('cars')
}
