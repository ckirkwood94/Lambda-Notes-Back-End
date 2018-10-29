const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
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
    .insert(note)
    .into('notes');
}

function remove(id) {
  return db('notes')
    .where({ id })
    .del();
}

function update(id, newNote) {
  return db('notes')
    .where({ id })
    .update(newNote);
}
