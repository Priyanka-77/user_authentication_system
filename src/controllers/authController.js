const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const Query = require("../database/query");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;

exports.signUp = async (req, res, next) => {
  try {
    const uid = uuidv4();
    let { name, email, mobile_no, address, password } = req?.body;

    const query =
      "INSERT INTO auth(id, name, email, mobile_no, address, password_hash) VALUES($1, $2, $3, $4, $5, $6)";

    const password_hash = await bcrypt.hash(password, 10);

    const values = [uid, name, email, mobile_no, address, password_hash];

    const result = await Query.create(query, values);
    return res
      .status(200)
      .send({ message: "You've signed-up successfully", data: result });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ error: error });
  }
};

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        console.log(password, "password");
        const query = "SELECT * from auth where email=$1";
        const values = [email];

        const result = await Query.fetch(query, values);
        console.log("result", result[0]?.password_hash);
        console.log(await bcrypt.compare(result[0]?.password_hash, password));
        const password_data = await bcrypt.hash(password, 10);

        if (result && result?.length > 0) {
          if (await bcrypt.compare(result[0]?.password_hash, password_data)) {
            return done(null, { status: 200, user: result[0] }, false); //login success
          } else {
            return done(null, { status: 401, user: null }, false); //invalid password
          }
        } else {
          return done(null, { status: 201, user: null }, false); //user not found
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
