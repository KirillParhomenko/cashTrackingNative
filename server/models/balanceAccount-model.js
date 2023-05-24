const { model, Schema } = require("mongoose");

const BalanceAccount = model(
  "BalanceAccount",
  new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    _currency: {
      type: Schema.Types.ObjectId,
      ref: "Currency",
      required: true,
    },
    balance: { type: Number, default: 0 },
    isConsiderInGeneralBalance: { type: Boolean, required: true },
  })
);

module.exports = BalanceAccount;
