const express = require("express");
const router = express.Router();

const { allData } = require("../controllers/allData.controller");
const authMiddleware = require("../middleware/auth");
const accountTypeMiddleware = require("../middleware/accountType");

router.get("/allData", authMiddleware, accountTypeMiddleware, allData);

module.exports = router;
