import { error } from '../utils/logger.js';

export const unkownEndpoint = (_req, res) =>
  res.status(404).json({ error: "Endpoint doesn't exist..." });

export const errorhandler = (err, _req, res, _next) => {
  error(err);
  res.status(500).json({ error: err.message });
};
