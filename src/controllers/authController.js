const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const Query = require("../database/query");

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
