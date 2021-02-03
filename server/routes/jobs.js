var express = require("express");
var router = express.Router();
import firebaseAdmin from "../firebaseAdmin";
import Model from "../model";
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
  const { identifier, deliverAt } = req.body;
  try {
    const result = await Model.createJob(identifier, deliverAt);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

export default router;
