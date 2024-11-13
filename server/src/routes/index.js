const express = require("express");
const router = express.Router();
const userRoutes = require("./UserRoutes");
const adminRoutes = require("./AdminRoutes");

router.use("/", userRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
