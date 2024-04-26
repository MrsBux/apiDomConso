const mongoose = require("mongoose");

const wineSchema = mongoose.Schema({
  id: { type: Number, required: true },

  name: { type: String, required: true },

  couleur: {
    type: String,
    enum: ["Blanc", "Rouge"],
    required: true,
  },

  AOC: {
    type: String,
    enum: ["Châteauneuf-du-Pape", "Lirac", "Vin de France"],
    required: true,
  },

  millesime: { type: Number },

  volume: {
    type: String,
    enum: ["75cl", "1,5L"],
  },

  degustation: { type: String, required: true },

  presse: [
    {
      source: { type: String },
      note: { type: Number },
      commentaire: { type: String },
    },
  ],

  degustationVideo: {
    videoUrl: { type: String },
  },

  img__btlle: { type: String, required: true },

  prix: { type: Number, required: true },
});

module.exports = mongoose.model("Wine", wineSchema);
