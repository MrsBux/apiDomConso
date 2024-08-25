const mongoose = require("mongoose");

const FormInvitSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    type: { type: String, required: true, default: "Invit" },
    name: { type: String, required: true },
    Date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FormInvit", FormInvitSchema);
