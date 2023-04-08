const { model, Schema } = require("mongoose");

const Token = model(
  "Token",
  Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
  })
);

module.exports = Token;
