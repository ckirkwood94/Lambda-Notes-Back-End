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

module.exports = router;
