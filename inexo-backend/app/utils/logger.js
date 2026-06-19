const pino = require('pino');
const env = require('../config/env');

const transport =
  env.NODE_ENV === 'development'
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      }
    : undefined;

module.exports = pino({
  level: env.LOG_LEVEL,
  transport,
});
