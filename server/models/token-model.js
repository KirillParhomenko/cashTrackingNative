const { model, Schema } = require("mongoose");

const Token = model(
  "Token",
  Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
  })
);

module.exports = Token;
