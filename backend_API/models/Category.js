const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    departmentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 4,
    },
    subcategories: [
      {
        name: String,
        id: String,
      },
    ],
    image: {
      type: String,
      required: true,
    },
    // products: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Product",
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema, "categories");
