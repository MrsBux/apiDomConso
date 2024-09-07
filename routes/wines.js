const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifytoken");

const winesCtrl = require("../controllers/wines.js");

router.post("/", verifyToken, winesCtrl.createWine);

router.put("/:id", verifyToken, winesCtrl.modifyWine);

router.delete("/:id", verifyToken, winesCtrl.deleteWine);

router.get("/:id", winesCtrl.getOneWine);

router.get("/", winesCtrl.getAllWines);

module.exports = router;
