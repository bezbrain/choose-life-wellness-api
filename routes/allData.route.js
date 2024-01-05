const express = require("express");
const router = express.Router();

const { allData } = require("../controllers/allData.controller");
const authMiddleware = require("../middleware/auth");

router.get("/allData", authMiddleware, allData);

module.exports = router;
