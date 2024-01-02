const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    message: err.message,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "ValidationError") {
    const errorValue = Object.values(err.errors)
      .map((each) => each.message)
      .join(", ");
    customError.message = errorValue;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // res.status(customError.statusCode).json({
  //   success: false,
  //   message: err,
  // });
  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
};

module.exports = errorHandlerMiddleware;
