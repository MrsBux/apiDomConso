const mongoose = require("mongoose");

const salonSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
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
      "Provence-Alpes-Côte d'Azur",
    ],
    required: true,
  },
  lieu: {
    nomVille: { type: String, required: true },
    codePostal: { type: Number, required: true },
  },
  category: {
    type: String,
    enum: ["SRG", "Vinomédia", "Indépendant"],
    required: true,
  },
  imageUrl: { type: String, required: true },
  invitation: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Salon", salonSchema);
