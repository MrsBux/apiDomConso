const mongoose = require("mongoose");

const partnerSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  contactUrl: { type: String },
  logoPUrl: { type: String },
  category: {
    type: String,
    enum: ["Restaurateur", "Importateur", "Caviste", "Autre"],
    required: true,
  },
  localisation: { type: String, required: true },
});

module.exports = mongoose.model("Partner", partnerSchema);
