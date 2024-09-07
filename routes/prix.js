const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifytoken");

const prixCtrl = require("../controllers/prix");

router.post("/New", verifyToken, prixCtrl.createPrix); // Changed to "/New" to match the pattern
router.delete("/:id", verifyToken, prixCtrl.deletePrix);
router.get("/All", prixCtrl.getAllPrix); // Changed to "/All" to match the pattern

module.exports = router;
