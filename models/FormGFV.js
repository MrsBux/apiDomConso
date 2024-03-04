const mongoose = require("mongoose");

const FormGFVSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("FormGFV", FormGFVSchema);
