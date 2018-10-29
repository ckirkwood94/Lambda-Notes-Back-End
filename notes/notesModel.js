const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
  getAll,
  getById,
  add,
};

function getAll() {
  return db('notes');
}

function getById(id) {
  return db('notes')
    .where({ id })
    .first();
}

function add(note) {
  return db('notes')
    .insert(note, 'id')
    .into('notes');
}
