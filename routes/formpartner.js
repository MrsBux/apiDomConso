const express = require("express");
const router = express.Router();
const formpartnerCtrl = require("../controllers/formpartner.js");

router.post("/post", formpartnerCtrl.postPartnerForm);

module.exports = router;
