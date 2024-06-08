// Import des modules nécessaires

const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET_KEY;
const crypto = require("crypto");

// Fonction pour créer un nouvel utilisateur
exports.signup = (req, res, next) => {
  const randomClientId = crypto.randomBytes(8).toString("hex");

  bcrypt
    .hash(req.body.password, 10) // Hachage du mot de passe avec bcrypt
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstname: req.body.firstname,
        name: req.body.name,
        numeroclient: randomClientId,
        points: 0,
      });
      // Enregistrement de l'utilisateur dans la base de données
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Fonction pour authentifier un utilisateur
exports.login = (req, res, next) => {
  // Recherche de l'utilisateur dans la base de données
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Mauvais couple mdp/email" });
      }
      /// Comparaison par bcrypt du mot de passe fourni avec celui enregistré
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mauvais couple mdp/email" });
          }

          // Génération d'un token JWT pour l'utilisateur authentifié

          res.status(200).json({
            user: user,
            userId: user._id,
            tokenUser: jwt.sign({ userId: user._id }, jwtSecret, {
              expiresIn: "6h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Fonction pour récupérer tous les utilisateurs
exports.getAllUsers = () => {
  return fetch("http://localhost:3000/api/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    });
};

// Fonction pour récupérer un utilisateur par son identifiant
exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};
