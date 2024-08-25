const express = require("express");
const router = express.Router();
const formGFVCtrl = require("../controllers/formGFV.js");

router.post("/post", formGFVCtrl.postForm);

router.get("/All", formGFVCtrl.getAllGFVForms);

module.exports = router;
