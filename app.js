var express = require("express")
var cors = require("cors")
var cookieParser = require("cookie-parser")
var bodyParser = require("body-parser")
require('dotenv').config()

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({origin: true}))


const userRouter = require("./src/routes/user")
const authRouter = require("./src/routes/auth")

app.use("/user",userRouter);
app.use("/auth", authRouter)

module.exports = app;

