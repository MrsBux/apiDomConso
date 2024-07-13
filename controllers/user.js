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
            name: user.name,
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
exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Failed to retrieve users", error: error });
    });
};

// Fonction pour récupérer un utilisateur par son identifiant
exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

// Fonction pour mettre à jour un utilisateur
exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updates = req.body;

  // Enlever les champs non modifiables
  delete updates.numeroclient;
  delete updates.firstname;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return User.findByIdAndUpdate(userId, updates, {
        new: true,
        runValidators: true,
      });
    })
    .then((updatedUser) => {
      if (updatedUser) {
        res
          .status(200)
          .json({ message: "User updated successfully", user: updatedUser });
      }
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        res.status(400).json({ message: "Invalid user ID" });
      } else if (error.code === 11000) {
        res.status(400).json({ message: "Email already in use" });
      } else {
        res
          .status(500)
          .json({ message: "Internal server error", error: error });
      }
    });
};
