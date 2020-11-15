const { Schema, model } = require("mongoose");

const sellerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    companyName: {
      type: String,
      required: true,
    },
    companyImage: {
      type: String,
      required: true,
    },
    location: {
      country: String,
      state: String,
      city: String,
      address: String,
      code: String,
    },
    description: {
      type: String,
      required: true,
      min: 10,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        description: String,
        date: Schema.Types.Date,
        owner: Schema.Types.ObjectId,
        likes: [Schema.Types.ObjectId],
      },
    ],
    images: [String],
    contacts: {
      email: String,
      phone: String,
      facebook: String,
      tweeter: String,
      website: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Seller", sellerSchema, "sellers");
