const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'user_authentication_system',
  password: 'Pass@123',
  port: 5432,
})

client.on("connect", () => {
  console.log("Connection start")
})

client.on("end", () => {
  console.log("Connection end")
})

module.exports = client;