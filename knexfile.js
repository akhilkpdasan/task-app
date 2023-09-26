// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQLDB_HOST,
      database: process.env.MYSQLDB_DATABASE,
      port: process.env.MYSQLDB_DOCKER_PORT,
      user: process.env.MYSQLDB_USER,
      password: process.env.MYSQLDB_ROOT_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  }
};
