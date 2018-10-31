const express = require('express');

const db = require('./notesModel');

const router = express.Router();

router.get('', (req, res) => {
  db.getAll()
    .then(async (returnedNotes) => {
      const promises = returnedNotes.map(async (note) => {
        await db.getTags(note.id).then((tags) => {
          note.tags = tags;
          console.log('inside map', note);
          return note;
        });
      });
      const results = Promise.all(promises);
      results.then((result) => {
        console.log('after map', result);
        res.status(200).json(result);
      });
      // console.log(returnedNotes);
      // newNotes = returnedNotes.map((note) => {
      //   console.log(note, note.id);
      //   notes.getTags(note.id).then((tags) => {
      //     note.tags = tags;
      //     console.log(note);
      //   });
      // });
      // console.log(notes);
    })
    .catch((err) => res.status(500).json(err));
});

// router.get('/tags', (req, res) => {
//   notes
//     .getTags(1)
//     .then((tags) => {
//       console.log(tags);
//       res.json(tags);
//     })
//     .catch((err) => res.status(500).json(err));
// });

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then((note) => {
      if (!note) {
        return res
          .status(404)
          .json({ message: `Note with id #${id} could not be found.` });
      }
      res.status(200).json(note);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('', (req, res) => {
  const { title, textBody } = req.body;
  if (!title || !textBody) {
    return res.status(400).json({
      message: 'Please provide a title and text body for the note.',
    });
  }
  const newNote = { title, textBody };
  db.add(newNote)
    .then((id) => {
      res.status(201).json(id);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then((count) => {
      if (count === 0) {
        return res.status(404).send({
          message: `Note with ID ${id} does not exist.`,
        });
      }
      res.status(200).send({ message: `Note with ID ${id} was removed.` });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { title, textBody } = req.body;
  if (!title || !textBody) {
    return res.status(400).send({
      message: 'Please provide a title and text body for the note.',
    });
  }
  const { id } = req.params;
  const newNote = { title, textBody };
  db.update(id, newNote)
    .then((note) => {
      if (!note) {
        return res.status(404).json({
          message: 'No note found to update',
        });
      }
      notes.getById(id).then((note) => {
        res.status(200).json(note);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
