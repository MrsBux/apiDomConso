const express = require("express");
const router = express.Router();
const formGFVCtrl = require("../controllers/formGFV.js");

router.post("/", formGFVCtrl.getForm);

module.exports = router;
