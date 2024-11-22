const express = require("express");
const HistoryController = require("../controllers/HistoryController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post("/create", authenticate, HistoryController.createHistory);

router.get(
  "/post-appointment-details",
  authenticate,
  HistoryController.getAllPostAppointmentDetails
);

router.get(
  "/post-appointment-details/:id",
  authenticate,
  HistoryController.getPostAppointmentDetailsById
);

router.put(
  "/post-appointment-details/:id",
  authenticate,
  HistoryController.editPostAppointmentDetails
);

router.delete(
  "/post-appointment-details/:id",
  authenticate,
  HistoryController.deletePostAppointmentDetails
);

router.get(
  "/payment-history",
  authenticate,
  HistoryController.getAllPaymentHistory
);

router.get(
  "/payment-history/:id",
  authenticate,
  HistoryController.getPaymentHistoryById
);

router.put(
  "/payment-history/:id",
  authenticate,
  HistoryController.editPaymentHistory
);

router.delete(
  "/payment-history/:id",
  authenticate,
  HistoryController.deletePaymentHistory
);

router.get(
  "/staff-remarks/:id",
  authenticate,
  HistoryController.getStaffRemarksById
);

module.exports = router;
