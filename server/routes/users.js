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

module.exports = router;
