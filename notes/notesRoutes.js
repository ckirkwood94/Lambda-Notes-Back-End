const express = require('express');

const db = require('./notesModel');

const router = express.Router();

// router.get('', (req, res) => {
//   db.getNotesAndTags()
//     .then((returnedNotes) => {
//       res.status(200).json(returnedNotes);
//     })
//     .catch((err) => res.status(500).json(err));
// });

// GET all notes with tags
router.get('', (req, res) => {
  db.getAll()
    .then((returnedNotes) => {
      // Create promises so all iterations of map run
      const promises = returnedNotes.map(async (note) => {
        await db.getTags(note.id).then((tags) => {
          note.tags = tags;
        });
        return note;
      });
      // Call promises and return results of all mapped over notes
      Promise.all(promises).then(function(result) {
        res.status(200).json(result);
      });
    })
    .catch((err) => res.status(500).json(err));
});

// GET Note by id with tags
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then((note) => {
      if (!note) {
        return res
          .status(404)
          .json({ message: `Note with id #${id} could not be found.` });
      }
      db.getTags(note.id).then((tags) => {
        note.tags = tags;
        res.status(200).json(note);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST New note
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

// DELETE note by id
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

// PUT edit note by id
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

// POST Add tag to specific note
router.post('/:notes_id', (req, res) => {
  const { notes_id } = req.params;
  const { tags_id } = req.body;
  if (!tags_id) {
    return res.status(400).json({ message: 'Tag id required to add tag' });
  }
  const tag = { notes_id, tags_id };
  db.addTagToNote(tag)
    .then((id) => {
      res.status(200).json(id);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// DELETE Remove tag from specific note
router.delete('/:notes_id/tag', (req, res) => {
  const { notes_id } = req.params;
  const { tags_id } = req.body;
  if (!tags_id) {
    return res.status(400).json({ message: 'Tag id required to remove tag' });
  }
  const tag = { notes_id, tags_id };
  db.removeTagFromNote(tag)
    .then((count) => {
      if (!count) {
        return res.status(404).json({ message: 'Could not remove tag' });
      }
      res.status(200).json({ message: 'Tag successfully removed' });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
