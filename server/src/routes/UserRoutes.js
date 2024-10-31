const express = require("express");
const userController = require("../controllers/UserController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/users", authenticate, userController.getAllUsers);
router.get("/users/:id", authenticate, userController.getUserById);

module.exports = router;
