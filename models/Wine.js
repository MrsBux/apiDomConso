const mongoose = require("mongoose");

const wineSchema = mongoose.Schema({
  name: { type: String, required: true },

  color: {
    type: String,
    enum: ["Blanc", "Rouge"],
    required: true,
  },

  appelation: {
    type: String,
    enum: ["Châteauneuf-du-Pape", "Lirac", "Vin de France"],
    required: true,
  },

  millesime: { type: Number },

  taille: {
    type: String,
    enum: ["75cl", "1,5L"],
  },

  cepages: [
    {
      cepage: {
        type: String,
        enum: [
          "Grenache",
          "Syrah",
          "Clairette",
          "Bourboulenc",
          "Mourvèdre",
          "Viognier",
          "Caladoc",
        ],
        required: true,
      },
      pourcentage: { type: Number, required: true },
    },
  ],

  elevage: { type: String, required: true },

  description: { type: String, required: true },

  notes: [
    {
      source: { type: String },
      note: { type: Number },
      commentaire: { type: String },
    },
  ],

  recompenses: [
    {
      titre: { type: String },
      annee: { type: Number },
      description: { type: String },
    },
  ],

  degustation: {
    videoUrl: { type: String },
  },

  imageUrl: { type: String, required: true },

  price: { type: Number, required: true },
});

module.exports = mongoose.model("Wine", wineSchema);
