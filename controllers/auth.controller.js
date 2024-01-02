const UserCollection = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { body } = req;
  const user = await UserCollection.create(body);
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User registration successful",
    token,
  });
};

const login = async (req, res) => {
  res.send("Login route");
};

module.exports = {
  register,
  login,
};
