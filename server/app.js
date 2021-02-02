import dotenv from "dotenv";
dotenv.config();
import RabbitMQ from "./rabbitMQ";
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
RabbitMQ.initSockets();

RabbitMQ.subFCM.on("data", function (note) {
  console.log("Alarum! %s", JSON.parse(note));
});
setTimeout(() => {
  RabbitMQ.pubFCM.write(JSON.stringify({ a: 1 }), "utf8");
}, 1000);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
