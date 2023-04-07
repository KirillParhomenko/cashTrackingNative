const express = require("express");
const userController = require("./../controllers/user-controller");

const router = express.Router();

router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/activate/:link", userController.activate);

module.exports = router;
