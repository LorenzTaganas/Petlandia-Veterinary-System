const express = require("express");
const appointmentScheduleController = require("../controllers/AppointmentScheduleController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get(
  "/",
  authenticate,
  appointmentScheduleController.getAppointmentSchedule
);
router.get(
  "/:id",
  authenticate,
  appointmentScheduleController.getAppointmentScheduleDetails
);
router.put(
  "/:id",
  authenticate,
  appointmentScheduleController.editAppointmentSchedule
);
router.delete(
  "/:id",
  authenticate,
  appointmentScheduleController.cancelAppointment
);

module.exports = router;
