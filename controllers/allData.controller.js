const UserCollection = require("../models/User");

const allData = async (req, res) => {
  if (req.return === "individual") {
    return res.send("All Individual Data");
  }
  return res.send("All Company Data");
};

module.exports = { allData };
