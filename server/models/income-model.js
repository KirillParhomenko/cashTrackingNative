const { model, Schema } = require("mongoose");

const Income = model(
  "Income",
  new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    count_id: { type: Schema.Types.ObjectId, ref: "Count", required: true },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: BigInt, required: true },
    date: { type: Date, required: true },
    description: { type: String },
  })
);

module.exports = Income;
