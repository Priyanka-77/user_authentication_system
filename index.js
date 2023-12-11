require("dotenv").config();
var http = require("http"); // 1 - Import Node.js core module
var app = require("./app");

var server = http.createServer(app);
server.listen(process.env.PORT); //3 - listen for any incoming requests

console.log(`Node.js web server at port ${process.env.PORT} is running..`);
