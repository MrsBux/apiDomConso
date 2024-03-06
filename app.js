const express = require("express");
const mongoose = require("mongoose");
const partnersRoutes = require("./routes/partners.js");
const winesRoutes = require("./routes/wines.js");
const salonsRoutes = require("./routes/salons.js");
const prestationsRoutes = require("./routes/prestations.js");
const newsSubsRoutes = require("./routes/newssub.js");
const formContactRoutes = require("./routes/formcontact.js");
const formGFVRoutes = require("./routes/formGFV.js");
const formPartnerRoutes = require("./routes/formpartner.js");
const formPrestationRoutes = require("./routes/formprestation.js");
const userRoutes = require("./routes/user.js");
const adminRoutes = require("./routes/admin.js");

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

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/partners", partnersRoutes);
app.use("/api/wines", winesRoutes);
app.use("/api/salons", salonsRoutes);
app.use("/api/prestations", prestationsRoutes);
app.use("/api/newssubs", newsSubsRoutes);
app.use("/api/formcontact", formContactRoutes);
app.use("/api/formGFV", formGFVRoutes);
app.use("/api/formpartner", formPartnerRoutes);
app.use("/api/formprestation", formPrestationRoutes);

module.exports = app;
