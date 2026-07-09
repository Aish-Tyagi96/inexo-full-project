const path = require('node:path');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const pinoHttp = require('pino-http');
const env = require('./config/env');
const routes = require('./routes');
const logger = require('./utils/logger');
const { errorHandler, notFoundHandler } = require('./middlewares/error.middleware');



const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(request) {
        return {
          method: request.method,
          url: request.url,
        };
      },
    },
  }),
);
app.use(
  cors({
    origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(',').map((value) => value.trim()),
    credentials: true,
  }),
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
    originAgentCluster: false,
  }),
);
app.use(hpp());
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));


app.use(env.API_PREFIX, routes);

// Root status route
app.get('/', (req, res) => {
  res.status(200).send('Inexo Backend is running');
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
