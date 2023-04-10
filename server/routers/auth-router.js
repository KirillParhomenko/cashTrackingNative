const express = require("express");
const userController = require("./../controllers/user-controller");
const { body } = require("express-validator");
const authMiddlerware = require("./../middlewares/auth-middleware");

const router = express.Router();

router.post("/signin", userController.signin);
router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 30 }),
  userController.signup
);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/activate/:link", userController.activate);
router.get("/getUsers", authMiddlerware, userController.getUsers);

module.exports = router;
