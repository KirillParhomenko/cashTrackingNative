const { model, Schema } = require("mongoose");

const Category = model(
  "Category",
  new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    categories: [
      {
        _id: { type: Schema.Types.ObjectId, unique: true, auto: true },
        name: { type: String },
        logo: { type: String },
        description: { type: String, default: "" },
        isSpending: { type: Boolean },
      },
    ],
  })
);

module.exports = Category;
