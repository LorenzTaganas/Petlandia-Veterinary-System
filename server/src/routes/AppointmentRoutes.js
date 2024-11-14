const express = require("express");
const appointmentController = require("../controllers/AppointmentController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

module.exports = router;
