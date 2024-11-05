module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'Ihc741258_',
      database: 'compasscar'
    },
    migrations: {
      directory: 'src/migrations'
    },
    seeds: {
      directory: 'src/seeds'
    }
  }
}
