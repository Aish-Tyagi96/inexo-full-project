const router = require('express').Router();
const env = require('../config/env');

router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Inexo backend is healthy.',
    data: {
      env: env.NODE_ENV,
      dialect: env.DB_DIALECT,
    },
  });
});

module.exports = router;
