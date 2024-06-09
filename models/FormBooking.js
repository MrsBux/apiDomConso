const mongoose = require("mongoose");

const FormBookingSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prestation: {
    type: String,
    required: true,
  },
  date: { type: Date, required: true },
  heure: { type: String },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
});

module.exports = mongoose.model("FormBooking", FormBookingSchema);
