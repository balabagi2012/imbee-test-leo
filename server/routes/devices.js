var express = require("express");
var router = express.Router();
import firebaseAdmin from "../firebaseAdmin";
import Model from "../model";
/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const result = await Model.getDevices();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.patch("/:identifier", async function (req, res, next) {
  const { identifier } = req.params;
  const { token } = req.body;
  try {
    const result = await Model.setDevice(identifier, token);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

export default router;
