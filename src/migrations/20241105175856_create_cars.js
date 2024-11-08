exports.up = async (knex) => {
  await knex.schema.createTable('cars', (t) => {
    t.increments('id').primary()
    t.string('brand').notNull()
    t.string('model').notNull()
    t.string('plate').notNull()
    t.integer('year').notNull()
    t.date('created_at').notNull()
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('cars')
}
