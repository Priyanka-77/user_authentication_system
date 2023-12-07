const Query = require("../database/query");
const { v4: uuidv4 } = require("uuid");

exports.getUser = async (req, res, next) => {
  try {
    const query = "SELECT * from auth";

    const result = await Query.getAll(query, []);
    if (result) {
      return res.status(200).send({ data: result });
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const query = "SELECT * from auth where id=$1";
    const value = [req?.params?.id];

    const result = await Query.fetch(query, value);
    if (result) {
      return res.status(200).send({ data: result });
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, mobile_no, address } = req?.body;
    const { id } = req?.params;
    const query =
      "UPDATE auth SET name=$1, email=$2, mobile_no=$3, address=$4 WHERE id=$5";
    const value = [name, email, mobile_no, address, id];

    const result = await Query.create(query, value);
    if (result) {
      return res
        .status(200)
        .send({ message: "User updated successfully", data: result });
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req?.params;
    const query = "DELETE from auth WHERE id=$1";
    const value = [id];

    const result = await Query.create(query, value);
    if (result) {
      return res
        .status(200)
        .send({ message: "User deleted successfully", data: result });
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
