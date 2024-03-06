const express = require("express");
const router = express.Router();
const formprestationCtrl = require("../controllers/formprestation.js");

router.post("/", formprestationCtrl.getForm);

module.exports = router;
