const { model, Schema } = require("mongoose");

const Count = model(
  "Count",
  new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    currency_id: {
      type: Schema.Types.ObjectId,
      ref: "Currency",
      required: true,
    },
    balance: { type: BigInt },
    isConsiderInGeneralBalance: { type: Boolean, required: true },
  })
);

module.exports = Count;
