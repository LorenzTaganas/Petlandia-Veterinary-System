const express = require("express");
const adminController = require("../controllers/AdminController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post(
  "/create-client",
  authenticate,
  adminController.createClientAccount
);
router.post("/create-admin", authenticate, adminController.createAdminAccount);
router.post("/create-staff", authenticate, adminController.createStaffAccount);

router.put(
  "/update-account",
  authenticate,
  adminController.updateAccountProfile
);
router.put(
  "/account-status",
  authenticate,
  adminController.toggleAccountStatus
);
router.put(
  "/account-password",
  authenticate,
  adminController.changeAccountPassword
);

module.exports = router;
