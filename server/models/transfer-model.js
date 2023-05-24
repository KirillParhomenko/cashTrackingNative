const { model, Schema } = require("mongoose");

const Transfer = model(
  "Transfer",
  new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    _recipient: {
      type: Schema.Types.ObjectId,
      ref: "BalanceAccount",
      required: true,
    },
    _sender: {
      type: Schema.Types.ObjectId,
      ref: "BalanceAccount",
      required: true,
    },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
  })
);

module.exports = Transfer;
