// Fichier contenant les routes de l'API pour les données relatives à l'authentification des utilisateurs

//import des différents outils, middlewares et controllers nécéssaires
const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin");

// routes post pour la création de connexion au compte admin
router.post("/login", adminCtrl.login);

module.exports = router;
