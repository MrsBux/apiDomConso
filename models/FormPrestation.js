const mongoose = require("mongoose");

const FormPrestationSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  telephone: { type: Number, required: true },
  email: { type: String, required: true },
  date: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
});

module.exports = mongoose.model("FormPrestation", FormPrestationSchema);
