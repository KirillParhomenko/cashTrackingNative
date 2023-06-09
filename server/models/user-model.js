const { model, Schema } = require("mongoose");

const User = model(
  "User",
  new Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
  })
);

module.exports = User;
