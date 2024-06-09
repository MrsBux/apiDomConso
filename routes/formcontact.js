const express = require("express");
const router = express.Router();
const formcontactCtrl = require("../controllers/formcontact");

router.post("/post", formcontactCtrl.postForm);

module.exports = router;
