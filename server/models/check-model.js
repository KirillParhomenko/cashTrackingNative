const { model, Schema } = require("mongoose");

const Check = model(
  "Check",
  new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    currency: { type: Schema.Types.ObjectId, ref: "Currency", required: true },
    balance: { type: BigInt },
    isConsiderInGeneralBalance: { type: Boolean, required: true },
  })
);

module.exports = Check;
