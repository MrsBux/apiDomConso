const mongoose = require("mongoose");

const FormPartnerSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  profession: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("FormPartner", FormPartnerSchema);
