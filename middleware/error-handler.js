const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    message: err.message || "Something went wrong. Please try again later!",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  // Validation Error
  if (err.name === "ValidationError") {
    const errorValue = Object.values(err.errors)
      .map((each) => each.message)
      .join(", ");
    customError.message = errorValue;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Cast Error
  if (err.code === 11000) {
    const errorValue = Object.keys(err.keyValue)[0];
    // console.log(errorValue);
    customError.message = `${errorValue} already existed, please use another one!`;
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
