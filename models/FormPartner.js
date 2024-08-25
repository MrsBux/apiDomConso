const mongoose = require("mongoose");

const FormPartnerSchema = mongoose.Schema(
  {
    nom: { type: String, required: true },
    type: { type: String, required: true, default: "Partenariat" },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    profession: { type: String, required: true },
    message: { type: String, required: true },
    Date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FormPartner", FormPartnerSchema);
