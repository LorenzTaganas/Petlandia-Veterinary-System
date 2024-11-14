const express = require("express");
const petGroomingController = require("../controllers/PetGroomingController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

module.exports = router;
