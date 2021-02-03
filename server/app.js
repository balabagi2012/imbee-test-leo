import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import path from "path";
import RabbitMQ from "./rabbitMQ";
import { devicesRouter, jobsRouter } from "./routes";

RabbitMQ.initSockets();
RabbitMQ.subFCM.on("data", function (note) {
  console.log("Alarum! %s", JSON.parse(note));
});
setTimeout(() => {
  RabbitMQ.pubFCM.write(JSON.stringify({ a: 1 }), "utf8");
}, 1000);

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/devices", devicesRouter);
app.use("/jobs", jobsRouter);

module.exports = app;
