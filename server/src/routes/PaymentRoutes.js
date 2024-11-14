const express = require("express");
const paymentController = require("../controllers/PaymentController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

module.exports = router;
