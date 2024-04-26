const express = require("express");
const router = express.Router();
const formbookingCtrl = require("../controllers/formbooking.js");

router.post("/", formbookingCtrl.getForm);

module.exports = router;
