const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");

const formcontactCtrl = require("../controllers/formcontact");

router.post("/post", formcontactCtrl.postForm);

router.get("/All", verifyToken, formcontactCtrl.getAllContactForms);

module.exports = router;
