const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
  getAll,
  getById,
};

function getAll() {
  return db('notes');
}

function getById(id) {
  return db('notes')
    .where({ id })
    .first();
}
