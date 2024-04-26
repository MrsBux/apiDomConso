const mongoose = require("mongoose");

const pressSchema = mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  lien: { type: String },
});

module.exports = mongoose.model("Press", pressSchema);
