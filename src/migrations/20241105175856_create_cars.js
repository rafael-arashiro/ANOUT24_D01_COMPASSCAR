exports.up = async (knex) => {
  await knex.schema.createTable('cars', (t) => {
    t.increments('id').primary()
    t.string('brand').notNull()
    t.string('model').notNull()
    t.string('plate').notNull()
    t.integer('year').notNull()
    t.timestamp('created_at', { precision: 3 }).defaultTo(knex.fn.now(3))
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('cars')
}
