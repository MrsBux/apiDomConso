const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  email: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  adresse: { type: String },
  date: { type: Date },
  state: { type: String, required: true },
  wine: [
    {
      wineName: { type: String, required: true },
      quantite: { type: Number, required: true },
    },
  ],
  winePrice: { type: Number, required: true },
  expeditionPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paiementType: { type: String, required: true },
  deliveryType: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
