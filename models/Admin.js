const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  photoURL: { type: String },
});

module.exports = mongoose.model("Admin", adminSchema);
