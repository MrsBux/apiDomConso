const mongoose = require("mongoose");

const FormInvitSchema = mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("FormInvit", FormInvitSchema);
