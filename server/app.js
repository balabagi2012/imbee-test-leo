import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import path from "path";
import RabbitMQ from "./rabbitMQ";
import { devicesRouter, jobsRouter } from "./routes";
import firebaseAdmin from "./firebaseAdmin";
import Model from "./model";

const defaultMessaging = firebaseAdmin.messaging();
RabbitMQ.initSockets();
RabbitMQ.subFCM.on("data", async function (note) {
  const { identifier, deviceId, text } = JSON.parse(note);
  try {
    await defaultMessaging.send({
      notification: { title: "Incoming message", body: text },
      token: deviceId,
    });
    const job = { identifier, deliverAt: new Date() };
    await Model.createJob(job.identifier, job.deliverAt);
    RabbitMQ.pubDone.write(JSON.stringify(job), "utf8");
  } catch (error) {
    console.log(error);
  }
});

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
