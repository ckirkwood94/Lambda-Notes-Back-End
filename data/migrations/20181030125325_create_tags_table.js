exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(tbl) {
    tbl.increments();

    tbl
      .string('name', 16)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
