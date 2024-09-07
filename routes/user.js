const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");

const userCtrl = require("../controllers/user");

// Routes pour l'authentification des utilisateurs
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// Routes pour récupérer tous les utilisateurs et un utilisateur par son identifiant
router.get("/all", verifyToken, userCtrl.getAllUsers);
router.get("/one/:userId", userCtrl.getOneUser);

// Route pour mettre à jour un utilisateur par son identifiant
router.put("/update/:userId", userCtrl.updateUser);

router.get("/count", userCtrl.countUsers);

module.exports = router;
