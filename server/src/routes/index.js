const express = require("express");
const router = express.Router();
const userRoutes = require("./UserRoutes");
const adminRoutes = require("./AdminRoutes");
const appointmentRoutes = require("./AppointmentRoutes");
const appointmentHistory = require("./AppointmentHistoryRoutes");
const notificationRoutes = require("./NotificationRoutes");
const paymentRoutes = require("./PaymentRoutes");
const reportRoutes = require("./ReportRoutes");
const petGroomingRoutes = require("./PetGrooming");

router.use("/", userRoutes);
router.use("/admin", adminRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/appointment-history", appointmentHistory);
router.use("/notification", notificationRoutes);
router.use("/payment", paymentRoutes);
router.use("/report", reportRoutes);
router.use("/pet-grooming", petGroomingRoutes);

module.exports = router;
