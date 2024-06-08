const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  firstname: { type: String, required: true },
  numeroclient: { type: String, required: true },
  points: { type: Number, required: true },
  address: { type: String },
  favoriteWine: { type: String },
  favoriteSalon: { type: String },
  photoURL: { type: String },
  age: { type: Number },
  profession: { type: String },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
