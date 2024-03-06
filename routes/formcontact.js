const express = require("express");
const router = express.Router();
const formcontactCtrl = require("../controllers/formcontact.js");

router.post("/", formcontactCtrl.getForm);

module.exports = router;
