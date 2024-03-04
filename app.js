const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

// ----Accéder au corps des requêtes aux format json et mise à disposition dans req.body (==bodyparser)

app.use(express.json());

//---- Gestion erreurs MULTI CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post("/api/partners", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({ message: "partenaire créé!" });
});

app.get("/api/partners", (req, res, next) => {
  const partners = [
    {
      _id: "oeihfzeoi",
      name: "Mon premier partenaire",
      description: "Les infos de mon premier partenaire",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      category: "restaurateur",
    },
    {
      _id: "oeihfzeomoihi",
      name: "Mon deuxième partenaire",
      description: "Les infos de mon deuxième partenaire",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      category: "restaurateur",
    },
  ];
  res.status(200).json(partners);
  console.log("response reçue");
});

module.exports = app;
