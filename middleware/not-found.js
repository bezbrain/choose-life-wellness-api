const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .send("<h1>This route does not exist</h1><a href='/'>Go Back Home</a>");
};

module.exports = notFoundMiddleware;
