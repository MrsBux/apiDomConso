const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET_KEY;

exports.login = (req, res, next) => {
  // Recherche de l'utilisateur dans la base de données
  Admin.findOne({ email: req.body.email })
    .then((admin) => {
      if (!admin) {
        return res.status(401).json({ error: "Mauvais couple mdp/email" });
      }
      /// Comparaison par bcrypt du mot de passe fourni avec celui enregistré
      bcrypt
        .compare(req.body.password, admin.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mauvais couple mdp/email" });
          }

          // Génération d'un token JWT pour l'utilisateur authentifié

          res.status(200).json({
            adminId: admin._id,
            token: jwt.sign({ adminId: admin._id }, jwtSecret, {
              expiresIn: "6h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
