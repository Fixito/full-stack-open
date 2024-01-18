const { error } = require('../utils/logger.js');

const unkownEndpoint = (_req, res) =>
  res.status(404).json({ error: "Endpoint doesn't exist..." });

const errorhandler = (err, _req, res, _next) => {
  error(err);
  res.status(500).json({ error: err.message });
};

module.exports = { unkownEndpoint, errorhandler };
