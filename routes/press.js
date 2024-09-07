const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");

const pressCtrl = require("../controllers/press");

router.post("/New", verifyToken, pressCtrl.createPress);

router.delete("/:id", verifyToken, pressCtrl.deletePress);

router.get("/All", pressCtrl.getAllPress);

module.exports = router;
