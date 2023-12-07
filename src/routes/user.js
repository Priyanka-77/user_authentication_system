const { Router } = require("express");

const userController = require("../controllers/userController");

var router = Router();

router.get("/", userController.getUser);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
