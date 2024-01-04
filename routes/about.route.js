const express = require("express");
const router = express.Router();

const { aboutMe } = require("../controllers/about.controller");
const authMiddleware = require("../middleware/auth");

router.post("/about", authMiddleware, aboutMe);

module.exports = router;
