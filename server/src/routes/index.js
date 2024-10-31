const express = require("express");
const router = express.Router();
const userRoutes = require("./UserRoutes");

router.use("/", userRoutes);

module.exports = router;
