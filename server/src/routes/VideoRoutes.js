const express = require("express");
const videoController = require("../controllers/VideoController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

module.exports = router;
