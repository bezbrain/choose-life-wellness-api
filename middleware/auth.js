const UnauthenticatedError = require("../errors/unauthenticated");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }

  const extractToken = authorization.split(" ")[1];

  try {
    const payload = jwt.verify(extractToken, process.env.JWT_SECRET);
    const { userId, first_name, email } = payload;
    req.user = { userId, first_name, email };
    next();
  } catch (error) {
    throw new UnauthenticatedError("User not authenticated");
  }
};

module.exports = authMiddleware;
