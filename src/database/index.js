const { Client } = require("pg");

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

client.connect();

// client.on("connect", () => {
//   console.log("Connection start");
// });

// client.on("end", () => {
//   console.log("Connection end")
// })

module.exports = client;
