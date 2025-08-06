
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.status || 500;
  const message = err.message || 'Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = errorHandler;
