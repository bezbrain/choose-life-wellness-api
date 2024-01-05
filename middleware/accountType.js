const UserCollection = require("../models/User");

const accountTypeMiddleware = async (req, res, next) => {
  const user = await UserCollection.findOne({
    email: req.user.email,
    accountType: req.user.accountType,
  });

  //   Conditionally send the response to be gotten on the frontend
  if (user.accountType === "individual") {
    req.return = "individual";
  }
  if (user.accountType === "company") {
    req.return = "company";
  }
  next();
};

module.exports = accountTypeMiddleware;
