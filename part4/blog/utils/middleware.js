import * as logger from './logger.js';

export const unkownEndpoint = (_req, res) =>
  res.status(404).json({ error: "Endpoint doesn't exist..." });

export const errorhandler = (err, _req, res, _next) => {
  logger.error(err);

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted id' });
  }

  res.status(500).json({ error: err.message });
};
