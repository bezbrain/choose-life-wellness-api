const UserCollection = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");

// Register a user
const register = async (req, res) => {
  const {
    body: { first_name, last_name, email },
  } = req;
  const user = await UserCollection.create(req.body);
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User registration successful",
    token,
    user: { first_name, last_name, email },
  });
};

// Login a user
const login = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  if (!email || !password) {
    throw new BadRequestError("Email and Passoword cannot be empty");
  }

  const user = await UserCollection.findOne({ email });

  if (!user) {
    throw new BadRequestError("Email does not exist");
  }

  // Call compare Password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Password is incorrect");
  }

  const token = user.createJWT();

  req.user = { email };
  // console.log(req.user);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Login successful",
    token,
    user: { email },
  });
};

module.exports = {
  register,
  login,
};
