const express = require("express");
const router = express.Router();
const formpartnerCtrl = require("../controllers/formpartner.js");

router.post("/post", formpartnerCtrl.postPartnerForm);

router.get("/All", formpartnerCtrl.getAllFormPartner);

module.exports = router;
