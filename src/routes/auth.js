const { Router } = require("express");
const passport = require("passport");

const authController = require("../controllers/authController");

var router = Router();

router.post("/sign-up", authController.signUp);

router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureMessage: { message: "Invalid Credentials" },
  }),
  // console.log(passport.authenticate())
  async function (req, res, next) {
    console.log(req?.user, "user");
    if (req?.user?.status == 200) {
      return res
        .status(req?.user?.status)
        .send({ message: "Login Successfully", data: user });
    } else if (req?.user?.status === 401) {
      return res
        .status(req?.user?.status)
        .send({ message: "User not present" });
    } else if (req?.user?.status === 202) {
      return res
        .status(req?.user?.status)
        .send({ message: "Invalid password" });
    } else {
      console.log(req?.user);
      return res.status(400).send({ data: req?.user });
    }
  }
);

module.exports = router;
