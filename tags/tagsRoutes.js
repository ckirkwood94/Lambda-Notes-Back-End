const express = require('express');

const tags = require('./tagsModel');

const router = express.Router();

router.get('', (req, res) => {
  tags
    .getTagNames()
    .then((tagNames) => {
      res.status(200).json(tagNames);
    })
    .catch((err) => res.status(500).json(err));
});

router.post('', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ message: 'Please provide a name for the tag' });
  }
  tags
    .addTagName({ name })
    .then((id) => res.status(201).json(id))
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tags
    .removeTagName({ id })
    .then((count) => {
      if (!count) {
        return res.status(404).json({ message: `Tag by id ${id} not found` });
      }
      res.status(200).json({ message: 'Tag deleted' });
    })
    .catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ message: 'Please provide a name for the tag.' });
  }
  const { id } = req.params;
  const tag = { name };
  tags.editTagName(id, tag).then((count) => {
    res.status(200).json({ message: `Successfully updated ${count} item` });
  });
});

module.exports = router;
