const http = require('node:http');
const app = require('./app/app');
const env = require('./app/config/env');
const { initializeDatabase } = require('./app/models');
const logger = require('./app/utils/logger');
const { seedDefaultAuthData } = require('./app/services/bootstrap.service');

function handleListenError(error) {
  if (error.code === 'EADDRINUSE') {
    logger.fatal({ port: env.PORT, error }, 'Inexo backend port is already in use');
    process.exit(1);
  }

  logger.fatal({ error }, 'Inexo backend failed while binding the HTTP server');
  process.exit(1);
}

async function startServer() {
  try {
    await initializeDatabase();
    await seedDefaultAuthData();

    const server = http.createServer(app);

    server.on('error', handleListenError);

    logger.info({ port: env.PORT, env: env.NODE_ENV }, 'Starting Inexo backend server');

    server.listen(env.PORT, '0.0.0.0', () => {
      logger.info({ port: env.PORT, env: env.NODE_ENV }, 'Inexo backend listening');
    });

    const shutdown = (signal) => {
      logger.info({ signal }, 'Received shutdown signal');
      server.close((error) => {
        if (error) {
          logger.error({ error }, 'Failed to close server gracefully');
          process.exit(1);
        }

        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    logger.fatal({ error }, 'Failed to start Inexo backend');
    process.exit(1);
  }
}

startServer();
