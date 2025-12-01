
// Schema da coleção "orders" no MongoDB

const mongoose = require("mongoose");

// Itens do pedido
const ItemSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: [true, "O campo productId é obrigatório"],
    },
    quantity: {
      type: Number,
      required: [true, "O campo quantity é obrigatório"],
      min: [1, "quantity deve ser pelo menos 1"],
    },
    price: {
      type: Number,
      required: [true, "O campo price é obrigatório"],
      min: [0, "price não pode ser negativo"],
    },
  },
  { _id: true }
);

// Pedido
const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, "O campo orderId é obrigatório"],
      unique: true,
      trim: true,
    },
    value: {
      type: Number,
      required: [true, "O campo value é obrigatório"],
      min: [0, "value não pode ser negativo"],
    },
    creationDate: {
      type: Date,
      required: [true, "O campo creationDate é obrigatório"],
    },
    items: {
      type: [ItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: "O pedido deve ter pelo menos um item",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
