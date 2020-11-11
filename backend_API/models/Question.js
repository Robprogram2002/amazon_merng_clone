const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    votes: [
      {
        person: Schema.Types.ObjectId,
        createdAt: Schema.Types.Date,
        ref: "User",
      },
    ],
    responses: [
      {
        person: Schema.Types.ObjectId,
        content: String,
        createdAt: Schema.Types.Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Question", questionSchema, "questions");
