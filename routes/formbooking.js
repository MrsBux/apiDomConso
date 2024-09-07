const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");

const formbookingCtrl = require("../controllers/formbooking.js");

router.post("/post", formbookingCtrl.postForm);

router.get("/All", verifyToken, formbookingCtrl.getAllBookingForms);

module.exports = router;
