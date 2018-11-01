exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('tags').insert([
        { id: 1, name: 'Home' },
        { id: 2, name: 'Work' },
        { id: 3, name: 'School' },
      ]);
    });
};
