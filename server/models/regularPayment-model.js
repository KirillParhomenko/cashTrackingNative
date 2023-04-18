const { model, Schema } = require("mongoose");

const RegularPayment = model(
  "RegularPayment",
  new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    count_id: { type: Schema.Types.ObjectId, ref: "Count", required: true },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: { type: String, required: true },
    period: { type: Date, required: true },
    isAddAutomatically: { type: Boolean, required: true },
    startNotification: { type: Date },
    price: { type: BigInt, required: true },
    decription: { type: String },
    date: { type: Date, required: true },
  })
);

module.exports = RegularPayment;
