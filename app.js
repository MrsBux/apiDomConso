const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin"); // Make sure the path to your Admin model is correct

const partnersRoutes = require("./routes/partners.js");
const winesRoutes = require("./routes/wines.js");
const salonsRoutes = require("./routes/salons.js");
const pressRoutes = require("./routes/press.js");
const prixRoutes = require("./routes/prix.js");
const actuRoutes = require("./routes/actu.js");
const newsSubsRoutes = require("./routes/newssub.js");
const formBookingRoutes = require("./routes/formbooking.js");
const formContactRoutes = require("./routes/formcontact.js");
const formGFVRoutes = require("./routes/formGFV.js");
const formPartnerRoutes = require("./routes/formpartner.js");
const userRoutes = require("./routes/user.js");
const adminRoutes = require("./routes/admin.js");
const formInvitRoutes = require("./routes/forminvit.js");
const orderRoutes = require("./routes/order.js");

require("dotenv").config();
const mongoURI = process.env.MONGODB_URI;

const adminEmail = process.env.EMAIL_CONSO; // Define these in your .env file
const adminPassword = process.env.EMAIL_PASSWORD; // Define these in your .env file
const saltRounds = 10;

const createAdminAccount = async () => {
  try {
    const adminUserCount = await Admin.countDocuments({ email: adminEmail });

    if (adminUserCount === 0) {
      const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

      const adminUser = new Admin({
        email: adminEmail,
        password: hashedPassword,
        name: "Admin", // You can change this as needed
      });

      await adminUser.save();
      console.log("Compte administrateur créé avec succès.");
    } else {
      console.log("Le compte administrateur existe déjà.");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la vérification/création du compte administrateur :",
      error.message
    );
  }
};

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connexion à MongoDB réussie !");
    await createAdminAccount();
  })
  .catch((error) => {
    console.error("Connexion à MongoDB échouée !", error);
  });

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration
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

// API routes
app.use("/api/admin", adminRoutes);
app.use("/api/actu", actuRoutes);
app.use("/api/user", userRoutes);
app.use("/api/partners", partnersRoutes);
app.use("/api/wines", winesRoutes);
app.use("/api/salons", salonsRoutes);
app.use("/api/press", pressRoutes);
app.use("/api/prix", prixRoutes);
app.use("/api/newssubs", newsSubsRoutes);
app.use("/api/formcontact", formContactRoutes);
app.use("/api/forminvit", formInvitRoutes);
app.use("/api/formGFV", formGFVRoutes);
app.use("/api/formbooking", formBookingRoutes);
app.use("/api/formpartner", formPartnerRoutes);
app.use("/api/order", orderRoutes);

module.exports = app;
