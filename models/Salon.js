const mongoose = require("mongoose");

const salonSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  debut: { type: Date, required: true },
  fin: { type: Date, required: true },
  region: {
    type: String,
    enum: [
      "Auvergne-Rhône-Alpes",
      "Bourgogne-Franche-Comté",
      "Bretagne",
      "Centre-Val de Loire",
      "Corse",
      "Grand Est",
      "Hauts-de-France",
      "Île-de-France",
      "Normandie",
      "Nouvelle-Aquitaine",
      "Occitanie",
      "Pays de la Loire",
      "PACA",
    ],
    required: true,
  },
  localisation: { type: String, required: true },
  logoUrl: { type: String },
  invitation: { type: String },
});

module.exports = mongoose.model("Salon", salonSchema);
