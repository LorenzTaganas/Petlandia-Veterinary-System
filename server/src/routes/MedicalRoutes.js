const express = require("express");
const medicalController = require("../controllers/MedicalController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

module.exports = router;
