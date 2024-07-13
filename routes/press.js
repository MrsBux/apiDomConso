const express = require("express");
const router = express.Router();

const pressCtrl = require("../controllers/press");

router.post("/New", pressCtrl.createPress);

router.delete("/:id", pressCtrl.deletePress);

router.get("/All", pressCtrl.getAllPress);

module.exports = router;
