const express = require("express");
const router = express.Router();
const salonsCtrl = require("../controllers/salons.js");

router.post("/New", salonsCtrl.createSalon); // Route pour créer un nouveau salon
router.put("/Put/:id", salonsCtrl.modifySalon); // Route pour modifier un salon par son ID
router.delete("/Delete/:id", salonsCtrl.deleteSalon); // Route pour supprimer un salon par son ID
router.get("/:id", salonsCtrl.getOneSalon); // Route pour récupérer un salon par son ID
router.get("/", salonsCtrl.getAllSalons); // Utilisation de '/' au lieu de '/All'

module.exports = router;
