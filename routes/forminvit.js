const express = require("express");
const router = express.Router();
const forminvitCtrl = require("../controllers/forminvit.js");

router.post("/post", forminvitCtrl.getForm);

router.get("/All", forminvitCtrl.getAllFormInvit);

module.exports = router;
