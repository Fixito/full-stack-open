import * as logger from './logger.js';
import jwt from 'jsonwebtoken';

export const unknownEndpoint = (_req, res) =>
  res.status(404).json({ error: "Endpoint doesn't exist..." });

export const errorhandler = (err, _req, res, _next) => {
  logger.error(err);

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted id' });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: err.message });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired',
    });
  }

  res.status(500).json({ error: err.message });
};

export const tokenExtractor = (request, _response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }

  next();
};

export const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token invalid' });
  }

  request.user = decodedToken;

  next();
};
