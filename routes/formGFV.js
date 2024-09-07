const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");

const formGFVCtrl = require("../controllers/formGFV.js");

router.post("/post", formGFVCtrl.postForm);

router.get("/All", verifyToken, formGFVCtrl.getAllGFVForms);

module.exports = router;
