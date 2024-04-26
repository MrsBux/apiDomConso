const mongoose = require("mongoose");

const FormBookingSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prestation: {
    type: String,
    enum: [
      "Dégustation au caveau (Gratuite)",
      "Dégustation en grand groupe au caveau (+8 personnes) (5€/ par personne",
      "Rétrospective complète et analyse des vins du domaine (25€/ par personne (à partir de 6personnes))",
      "Repas accord mets et vins (à partir de 35€ par personne)",
      "Visite complète du domaine, master class et dégustation (à partir de 30€ par personne)",
      " Visite et dégustation directement dans la vigne (à partir de 40€ par personne)",
      "Prestation 100% personnalisable",
    ],
    required: true,
  },
  date: { type: Date, required: true },
  heure: { type: Number },
  email: { type: String, required: true },
  telephone: { type: Number, required: true },
});

module.exports = mongoose.model("FormBooking", FormBookingSchema);
