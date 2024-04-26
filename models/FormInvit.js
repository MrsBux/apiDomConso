const mongoose = require("mongoose");

const FormInvitSchema = mongoose.Schema({
  email: { type: String, required: true },
  salon: { type: String, required: true },
});

module.exports = mongoose.model("FormInvit", FormInvitSchema);
