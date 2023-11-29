const { Router } = require("express");

const userController = require("../controllers/userController");

var router = Router();

router.get("/", userController.getUser);

module.exports = router