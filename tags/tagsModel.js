const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
  addTagName,
  removeTagName,
  getTagNames,
  editTagName,
};

function addTagName(tag) {
  return db('tags').insert(tag);
}

function removeTagName(id) {
  return db('tags')
    .where(id)
    .del();
}

function getTagNames() {
  return db('tags');
}

function editTagName(id, tag) {
  return db('tags')
    .where({ id })
    .update(tag);
}
