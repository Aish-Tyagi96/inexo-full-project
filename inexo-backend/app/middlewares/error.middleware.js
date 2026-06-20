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
    const details = {};
    let customMessage = '';

    if (error.errors && error.errors.length > 0) {
      error.errors.forEach((errItem) => {
        let errMsg = errItem.message;
        if (errItem.path === 'slug' && error.name === 'SequelizeUniqueConstraintError') {
          errMsg = 'slug must be unique';
        }
        details[errItem.path] = errMsg;
        if (!customMessage) {
          customMessage = errMsg;
        } else {
          customMessage += `, ${errMsg}`;
        }
      });
    }

    const message = customMessage || 'Database validation failed';

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
