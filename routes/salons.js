const express = require("express");
const router = express.Router();

const salonsCtrl = require("../controllers/salons.js");

router.post("/", salonsCtrl.createSalon);

router.put("/:id", salonsCtrl.modifySalon);

router.delete("/:id", salonsCtrl.deleteSalon);

router.get("/:id", salonsCtrl.getOneSalon);

router.get("/", salonsCtrl.getAllSalons);

module.exports = router;
