const mongoose = require("mongoose");

const prixSchema = mongoose.Schema({
  date: { type: Date, required: true },
  vin: { type: String, required: true },
  name: { type: String, required: true },
  lien: { type: String },
});

module.exports = mongoose.model("prix", prixSchema);
