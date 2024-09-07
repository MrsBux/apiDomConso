const express = require("express");
const router = express.Router();
const salonsCtrl = require("../controllers/salons.js");
const upload = require("../middlewares/multer");
const verifyToken = require("../middlewares/verifytoken");

router.post(
  "/New",
  verifyToken,
  upload.single("invitation"),
  salonsCtrl.createSalon
);
router.put("/Put/:id", verifyToken, salonsCtrl.modifySalon); // Route pour modifier un salon par son ID
router.delete("/Delete/:id", verifyToken, salonsCtrl.deleteSalon); // Route pour supprimer un salon par son ID
router.get("/:id", salonsCtrl.getOneSalon); // Route pour récupérer un salon par son ID
router.get("/", salonsCtrl.getAllSalons); // Utilisation de '/' au lieu de '/All'
router.get("/:id/download", salonsCtrl.downloadInvitation);

module.exports = router;
