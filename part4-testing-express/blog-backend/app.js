import 'express-async-errors';
import express from 'express';
const app = express();
import morgan from 'morgan';
import { connect } from 'mongoose';
import cors from 'cors';
import * as logger from './utils/logger.js';
import { MONGODB_URI } from './utils/config.js';
import {
  unknownEndpoint,
  errorhandler,
  tokenExtractor,
} from './utils/middleware.js';

import blogsRouter from './routes/blogs.js';
import usersRouter from './routes/users.js';
import loginRouter from './routes/login.js';

if (process.env.NODE_ENV === 'test') {
  try {
    const { default: testingRouter } = await import('./routes/testing.js');
    app.use('/api/testing', testingRouter);
  } catch (error) {
    logger.error('Error loading testing router:', error);
  }
}

connect(MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use(tokenExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(unknownEndpoint);
app.use(errorhandler);

export default app;
