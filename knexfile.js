// knexfile.js
require('dotenv').config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DATABASE_URL || './db.sqlite'
    },
    useNullAsDefault: true,    // oculta o warning de DEFAULT VALUES
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  },
};
