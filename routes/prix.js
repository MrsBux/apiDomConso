const express = require("express");
const router = express.Router();

const prixCtrl = require("../controllers/prix");

router.post("/", prixCtrl.createPrix);

router.delete("/:id", prixCtrl.deletePrix);

router.get("/", prixCtrl.getAllPrix);

module.exports = router;
