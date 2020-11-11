const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        unique: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    caracteristicas: [
      {
        type: String,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        red: "Comment",
      },
    ],
    discont: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    freeSend: {
      type: Schema.Types.Boolean,
      default: false,
    },
    prime: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema, "products");
