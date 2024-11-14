const express = require("express");
const router = express.Router();
const userRoutes = require("./UserRoutes");
const adminRoutes = require("./AdminRoutes");
const appointmentRoutes = require("./AppointmentRoutes");
const medicalRoutes = require("./MedicalRoutes");
const notificationRoutes = require("./NotificationRoutes");
const paymentRoutes = require("./PaymentRoutes");
const reportRoutes = require("./ReportRoutes");
const videoRoutes = require("./ReportRoutes");

router.use("/", userRoutes);
router.use("/admin", adminRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/medical", medicalRoutes);
router.use("/notification", notificationRoutes);
router.use("/payment", paymentRoutes);
router.use("/report", reportRoutes);
router.use("/video", videoRoutes);

module.exports = router;
