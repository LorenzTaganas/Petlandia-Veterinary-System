const express = require("express");
const router = express.Router();
const userRoutes = require("./UserRoutes");
const adminRoutes = require("./AdminRoutes");
const appointmentRequestRoutes = require("./AppointmentRequestRoutes");
const appointmentScheduleRoutes = require("./AppointmentScheduleRoutes");
const historyRoutes = require("./HistoryRoutes");
const notificationRoutes = require("./NotificationRoutes");
const reportRoutes = require("./ReportRoutes");
const petGroomingRoutes = require("./PetGroomingRoutes");

router.use("/", userRoutes);
router.use("/admin", adminRoutes);
router.use("/appointment-requests", appointmentRequestRoutes);
router.use("/appointment-schedule", appointmentScheduleRoutes);
router.use("/history", historyRoutes);
router.use("/notifications", notificationRoutes);
router.use("/reports", reportRoutes);
router.use("/pet-grooming", petGroomingRoutes);

module.exports = router;
