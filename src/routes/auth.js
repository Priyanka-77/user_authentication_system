const { Router } = require("express");

const authController = require("../controllers/authController");

var router = Router();

router.post("/sign-up", authController.signUp);

module.exports = router