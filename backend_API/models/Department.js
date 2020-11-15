const { Schema, model } = require("mongoose");

const departmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 4,
    },
    images: [
      {
        type: String,
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Department", departmentSchema, "departments");
