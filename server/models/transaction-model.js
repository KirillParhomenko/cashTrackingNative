const { model, Schema } = require("mongoose");

const Transaction = model(
  "Transaction",
  new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    _balanceAccount: {
      type: Schema.Types.ObjectId,
      ref: "BalanceAccount",
      required: true,
    },
    _category: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, default: "" },
    isSpending: { type: Boolean, required: true },
  })
);

module.exports = Transaction;
