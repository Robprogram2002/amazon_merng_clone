const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    content: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    rate: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    likes: [{ person: Schema.Types.ObjectId, createdAt: Schema.Types.Date }],
    responses: [
      {
        owner: Schema.Types.ObjectId,
        content: String,
        createdAt: Schema.Types.Date,
        likes: [
          {
            user: Schema.Types.ObjectId,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema, "comments");
