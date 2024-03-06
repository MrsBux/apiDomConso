const express = require("express");
const router = express.Router();

const prestationsCtrl = require("../controllers/salons.js");

router.post("/", prestationsCtrl.createPrestation);

router.put("/:id", prestationsCtrl.modifyPrestation);

router.delete("/:id", prestationsCtrl.deletePrestation);

router.get("/:id", prestationsCtrl.getOnePrestations);

router.get("/", salonsCtrl.getAllPrestations);

module.exports = router;
