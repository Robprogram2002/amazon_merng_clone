const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategoryId: {
      type: String,
    },
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
      ref: "Seller",
    },
    caracteristicas: [
      {
        type: String,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    discont: {
      type: Number,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
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
