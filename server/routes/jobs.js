var express = require("express");
var router = express.Router();
import nanoid from "nanoid";
import Model from "../model";
import RabbitMQ from "../rabbitMQ";

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const result = await Model.getJobs();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async function (req, res, next) {
  const { text, deviceId } = req.body;
  try {
    RabbitMQ.pubFCM.write(
      JSON.stringify({
        identifier: `fcm-msg-${nanoid.nanoid()}`,
        deviceId,
        text,
      }),
      "utf8"
    );
    res.json(true);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/", async function (req, res, next) {
  try {
    const result = await Model.removeJobs();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

export default router;
