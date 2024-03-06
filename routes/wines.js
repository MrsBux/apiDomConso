const express = require("express");
const router = express.Router();

const winesCtrl = require("../controllers/wines.js");

router.post("/", winesCtrl.createWine);

router.put("/:id", winesCtrl.modifyWine);

router.delete("/:id", winesCtrl.deleteWine);

router.get("/:id", winesCtrl.getOneWine);

router.get("/", winesCtrl.getAllWines);

module.exports = router;
