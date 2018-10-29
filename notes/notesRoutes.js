const express = require('express');

const notes = require('./notesModel');

const router = express.Router();

router.get('', (req, res) => {
  notes
    .getAll()
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  notes
    .getById(id)
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

module.exports = router;
