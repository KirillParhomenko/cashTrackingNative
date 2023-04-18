const { model, Schema } = require("mongoose");

const Transfer = model(
  "Transfer",
  new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "Count",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Count",
      required: true,
    },
    price: { type: BigInt, required: true },
    date: { type: Date, required: true },
  })
);
