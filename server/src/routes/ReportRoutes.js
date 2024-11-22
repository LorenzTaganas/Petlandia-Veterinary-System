const express = require("express");
const reportController = require("../controllers/ReportController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get("/", authenticate, reportController.getReports);
router.get("/top-clients", authenticate, reportController.getTopClients);
router.get("/assigned-staff", authenticate, reportController.getAssignedStaff);
router.get(
  "/most-preferred-staff",
  authenticate,
  reportController.getMostPreferredStaff
);
router.get(
  "/revenue-overview",
  authenticate,
  reportController.getRevenueOverview
);
router.get(
  "/most-selected-appointment-types",
  authenticate,
  reportController.getMostSelectedAppointmentTypes
);

module.exports = router;
