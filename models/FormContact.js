const mongoose = require("mongoose");

const FormContactSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    type: { type: String, required: true, default: "Contact" },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    Date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FormContact", FormContactSchema);
