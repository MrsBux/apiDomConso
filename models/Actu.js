const mongoose = require("mongoose");

const actuSchema = mongoose.Schema({
  id: { type: String },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  text: { type: String },
});

module.exports = mongoose.model("Actu", actuSchema);
