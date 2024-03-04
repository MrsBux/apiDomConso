const mongoose = require("mongoose");

const NewsSubSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("NewsSub", NewsSubSchema);
