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

const websiteDistPath = path.resolve(__dirname, '../../inexo-website/dist');
const adminDistPath = path.resolve(__dirname, '../../inexo-admin-portal/dist');

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
  }),
);
app.use(hpp());
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));


app.use(env.API_PREFIX, routes);

// Serve admin portal static files under /admin
app.use('/admin', express.static(adminDistPath));
// Serve admin portal client-side routing fallback for /admin/*
app.get(/^\/admin.*/, (req, res) => {
  res.sendFile(path.resolve(adminDistPath, 'index.html'));
});

// Serve website static files under /
app.use(express.static(websiteDistPath));
// Serve website client-side routing fallback for *
// Make sure to bypass api paths and upload paths so they hit their respective handlers / 404s
app.get(/.*/, (req, res, next) => {
  if (req.path.startsWith(env.API_PREFIX) || req.path.startsWith('/uploads')) {
    return next();
  }
  res.sendFile(path.resolve(websiteDistPath, 'index.html'));
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
