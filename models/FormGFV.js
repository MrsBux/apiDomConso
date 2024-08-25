const mongoose = require("mongoose");

const FormGFVSchema = mongoose.Schema(
  {
    type: { type: String, required: true, default: "GFV" },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    Date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FormGFV", FormGFVSchema);
