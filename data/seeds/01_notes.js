exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'Test', textBody: 'This is a test note.' },
        { title: 'A note', textBody: 'This is another note.' },
        {
          title: 'A slightly longer note title',
          textBody:
            'This is a note with a longer title and body than the other notes.',
        },
      ]);
    });
};
