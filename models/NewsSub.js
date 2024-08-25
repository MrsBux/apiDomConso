const mongoose = require("mongoose");

const NewsSubSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    Date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewsSub", NewsSubSchema);
