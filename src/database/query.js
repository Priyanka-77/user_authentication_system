const client = require("./index");

exports.create = async (query, values) => {
  try {
    // await client.connect();
    let result = await client.query(query, values);
    // client.end();
    return result?.rowCount;
  } catch (error) {
    return { error: error };
  }
};

exports.fetch = async (query, values) => {
  try {
    // await client.connect();
    let result = await client.query(query, values);
    // client.end();
    if (result) {
      return result.rows[0];
    }
  } catch (error) {
    return { error: error };
  }
};

exports.getAll = async (query, values) => {
  try {
    let result = await client.query(query, values);
    if (result) {
      return result.rows;
    }
  } catch (error) {
    return { error: error };
  }
};
