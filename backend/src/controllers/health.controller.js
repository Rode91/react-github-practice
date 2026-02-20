const healthService = require('../services/health.service');

const check = (req, res) => {
  const status = healthService.getStatus();

  res.status(200).json(status);
};

module.exports = {
  check
};
