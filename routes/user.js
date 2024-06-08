// Fichier contenant les routes de l'API pour les données relatives à l'authentification des utilisateurs

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const { getAllUsers, getUserById } = require("../controllers/user");

// Routes pour l'authentification des utilisateurs
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// Routes pour récupérer tous les utilisateurs et un utilisateur par son identifiant
router.get("/All", getAllUsers);
router.get("/One/:userId", userCtrl.getOneUser);

module.exports = router;
