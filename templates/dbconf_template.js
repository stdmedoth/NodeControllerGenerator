var knex = require('knex')({
  client: '{client}',
  connection: {
    host: '{host}',
    user: '{user}',
    password: '{password}',
    database: '{database}'
  }
});

module.exports = knex;
