import 'express-async-errors';
import express from 'express';
const app = express();
import { connect } from 'mongoose';
import cors from 'cors';
import * as logger from './utils/logger.js';
import { MONGODB_URI } from './utils/config.js';
import {
  unkownEndpoint,
  errorhandler,
  tokenExtractor,
} from './utils/middleware.js';

import blogsRouter from './routes/blogs.js';
import usersRouter from './routes/users.js';
import loginRouter from './routes/login.js';

connect(MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use(tokenExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(unkownEndpoint);
app.use(errorhandler);

export default app;
