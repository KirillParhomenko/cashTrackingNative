const { model, Schema } = require("mongoose");

const Currency = model(
  "Currency",
  new Schema({
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    symbol: { type: String, required: true },
    convert: {
      type: Number,
      required: true,
    },
  })
);

module.exports = Currency;
