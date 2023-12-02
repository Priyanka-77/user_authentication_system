const client = require("./index");

exports.create = (async (query, values) => {
  try {
    await client.connect();
    let result = await client.query(query, values);
    client.end();
    return result?.rowCount;
  } catch (error) {
    return { error: error };
  }
});
