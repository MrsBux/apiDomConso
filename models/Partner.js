const mongoose = require("mongoose");

const partnerSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  contactUrl: { type: String },
  logoPUrl: { type: String, required: true },
  category: {
    type: String,
    enum: ["restaurateur", "importateur", "caviste", "autre"],
    required: true,
  },
  localisation: { type: Number, required: true },
});

module.exports = mongoose.model("Partner", partnerSchema);
