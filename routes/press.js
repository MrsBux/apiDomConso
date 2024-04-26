const express = require("express");
const router = express.Router();

const pressCtrl = require("../controllers/press");

router.post("/", pressCtrl.createPress);

router.delete("/:id", pressCtrl.deletePress);

router.get("/", pressCtrl.getAllPress);

module.exports = router;
