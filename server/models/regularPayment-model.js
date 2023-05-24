const { model, Schema } = require("mongoose");

const RegularPayment = model(
  "RegularPayment",
  new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    _balanceAccount: {
      type: Schema.Types.ObjectId,
      ref: "BalanceAccount",
      required: true,
    },
    _category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: { type: String, required: true },
    period: { type: Date, required: true },
    isAddAutomatically: { type: Boolean, required: true },
    startNotification: { type: Date },
    price: { type: Number, required: true },
    decription: { type: String },
    date: { type: Date, required: true },
  })
);

module.exports = RegularPayment;
