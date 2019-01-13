exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes_tags', function(tbl) {
    tbl.increments();

    tbl
      .integer('notes_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('notes');

    tbl
      .integer('tags_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('tags');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes_tags');
};
