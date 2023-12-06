const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const Query = require("../database/query");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const moment = require("moment");

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
        const query = "SELECT * from auth where email=$1";
        const values = [email];

        const result = await Query.fetch(query, values);

        if (result) {
          if (await bcrypt.compare(password, result?.password_hash)) {
            let payload = {
              iat: moment().unix(),
              exp: moment().add(7, "days").unix(),
              user: { user_id: result.id, user_email: result.email },
            };
            result.accessToken = jwt.sign(payload, "secret");
            return done(null, { status: 200, user: result }, false); //login success
          } else {
            return done(null, { status: 401, user: null }, false); //invalid password
          }
        } else {
          return done(null, { status: 400, user: null }, false); //user not found
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

exports.validateTokenResponse = async function (req, res, next) {
  passport.authenticate("jwt", async (err, user) => {
    if (!user) return res.status(401).send({ message: "Invalid-JWT" });
    req.session = false;
    req.user = user;
    next();
  })(req, res, next);
};

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    function (jwt_payload, done) {
      done(null, { id: jwt_payload?.user?.user_id });
    }
  )
);
