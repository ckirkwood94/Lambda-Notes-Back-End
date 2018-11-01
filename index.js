const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const notesRoutes = require('./notes/notesRoutes');
const notes = require('./notes/notesModel');

const port = 8000;

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(express.json());
server.use(cors());

// ROUTES
server.use('/api/notes', notesRoutes);

server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
