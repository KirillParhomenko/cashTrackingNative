const { model, Schema } = require("mongoose");

const Token = model(
  "Token",
  Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
  })
);

module.exports = Token;
