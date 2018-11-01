const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  getTags,
  getNotesAndTags,
  addTagToNote,
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

function getTags(noteId) {
  return db('notes_tags')
    .innerJoin('tags', 'notes_tags.tags_id', 'tags.id')
    .where({ notes_id: noteId })
    .select('tags.name')
    .map((row) => row.name);
}

function getNotesAndTags() {
  return db
    .select('notes.id', 'notes.title', 'notes.textBody', 'tags.name')
    .from('notes')
    .leftJoin('notes_tags', 'notes.id', 'notes_tags.notes_id')
    .leftJoin('tags', 'notes_tags.tags_id', 'tags.id');
}

function addTagToNote(tag) {
  return db('notes_tags').insert(tag);
}
