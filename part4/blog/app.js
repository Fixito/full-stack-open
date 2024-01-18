const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./utils/logger.js');
const { MONGODB_URI } = require('./utils/config.js');
const { unkownEndpoint, errorhandler } = require('./utils/utils.js');

const blogsRouter = require('./routes/blogs.js');

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

app.use(unkownEndpoint);
app.use(errorhandler);

module.exports = app;
