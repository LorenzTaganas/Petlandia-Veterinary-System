const express = require("express");
const notificationController = require("../controllers/NotificationController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get(
  "/user/:userId",
  authenticate,
  notificationController.getUserNotifications
);

router.patch(
  "/mark-as-read",
  authenticate,
  notificationController.markNotificationsAsRead
);

module.exports = router;
