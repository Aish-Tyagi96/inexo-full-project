const { ZodError } = require('zod');
const { StatusCode } = require('../constants/HttpStatusCode');

function validate(schema) {
  return (req, res, next) => {
    try {
      req.validated = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(StatusCode.BAD_REQUEST.code).json({
          success: false,
          message: 'Validation failed',
          errors: error.flatten(),
        });
      }

      return next(error);
    }
  };
}

module.exports = validate;
