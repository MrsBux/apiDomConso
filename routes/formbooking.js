const express = require("express");
const router = express.Router();
const formbookingCtrl = require("../controllers/formbooking.js");

router.post("/post", formbookingCtrl.postForm);

router.get("/All", formbookingCtrl.getAllBookingForms);

module.exports = router;
