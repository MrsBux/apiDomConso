const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");

const formpartnerCtrl = require("../controllers/formpartner.js");

router.post("/post", formpartnerCtrl.postPartnerForm);

router.get("/All", verifyToken, formpartnerCtrl.getAllFormPartner);

module.exports = router;
