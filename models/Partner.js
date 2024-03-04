const mongoose = require("mongoose");

const partnerSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  contactUrl: { type: String },
  category: {
    type: String,
    enum: ["restaurateur", "importateur", "caviste", "autre"],
    required: true,
  },
});

module.exports = mongoose.model("Partner", partnerSchema);
