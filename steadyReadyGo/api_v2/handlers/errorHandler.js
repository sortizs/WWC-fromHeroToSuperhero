/**
 * Log error and pass them to the next middleware.
 * @param {object} err The error that needs to be logged
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The next middleware in the chain
 */
export function errorLogger(err, req, res, next) {
  console.error(err);
  next(err);
}

/**
 * Handle errors and send a response with a estatus code of 400
 * and a JSON object containing the error message.
 * @param {object} err The error that needs to be logged
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The next middleware in the chain
 */
export function errorHandler(err, req, res, next) {
  res.status(400).json({
    message: err.message,
  });
}
