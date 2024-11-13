const express = require("express");
const userController = require("../controllers/UserController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/users", authenticate, userController.getAllUsers);
router.get("/users/id/:id", authenticate, userController.getUserById);
router.get("/users/role/:role", authenticate, userController.getUsersByRole);
router.get("/profile", authenticate, userController.getUserProfile);

router.post("/refresh-token", userController.refreshToken);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.put("/change-password", authenticate, userController.changePassword);
router.put("/update-profile", authenticate, userController.updateUserProfile);

module.exports = router;
