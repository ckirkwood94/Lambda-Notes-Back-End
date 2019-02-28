require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const notesRoutes = require('./notes/notesRoutes');
const tagsRoutes = require('./tags/tagsRoutes');

const port = process.env.PORT || 8000;

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(express.json());
server.use(cors());

// ROUTES
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running!' });
});
server.use('/api/notes', notesRoutes);
server.use('/api/tags', tagsRoutes);

server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
