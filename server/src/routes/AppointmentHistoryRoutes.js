const express = require("express");
const appointmentHistoryController = require("../controllers/AppointmentHistoryController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

module.exports = router;
