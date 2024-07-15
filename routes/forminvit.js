const express = require("express");
const router = express.Router();
const forminvitCtrl = require("../controllers/forminvit.js");

router.post("/post", forminvitCtrl.getForm);

module.exports = router;
