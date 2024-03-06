const mongoose = require("mongoose");

const prestationSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
  category: {
    type: String,
    enum: ["Visite", "Dégustation", "Complet", "Autre"],
    required: true,
  },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Prestation", prestationSchema);
