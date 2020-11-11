const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profile: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
    },
    address: {
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      address: {
        type: String,
      },
      description: {
        type: String,
      },
    },
    payMethod: {
      card: {
        type: String,
      },
      cardNumber: {
        type: String,
      },
    },
    carrito: {
      products: [
        {
          product: Schema.Types.ObjectId,
          cantidad: Schema.Types.Number,
        },
      ],
      total: {
        type: Number,
      },
      date: Schema.Types.Date,
    },
    pedidos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pedido",
      },
    ],
    class: {
      type: String,
      default: "customer",
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema, "users");
