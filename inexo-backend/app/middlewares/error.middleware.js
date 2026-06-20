const { StatusCode } = require('../constants/HttpStatusCode');
const logger = require('../utils/logger');

function notFoundHandler(req, res) {
  res.status(StatusCode.NOT_FOUND.code).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(error, req, res, _next) {
  logger.error({ error, path: req.originalUrl, method: req.method }, 'Unhandled request error');

  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    const details = error.errors
      ? error.errors.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {})
      : {};

    const message = error.errors && error.errors.length > 0
      ? error.errors.map((e) => e.message).join(', ')
      : 'Database validation failed';

    return res.status(StatusCode.BAD_REQUEST.code).json({
      success: false,
      message,
      errors: details,
    });
  }

  const statusCode = error.statusCode || StatusCode.SERVER_ERROR.code;

  res.status(statusCode).json({
    success: false,
    message: error.message || StatusCode.SERVER_ERROR.message,
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
