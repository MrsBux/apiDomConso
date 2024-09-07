const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");

const forminvitCtrl = require("../controllers/forminvit.js");

router.post("/post", forminvitCtrl.getForm);

router.get("/All", verifyToken, forminvitCtrl.getAllFormInvit);

module.exports = router;
