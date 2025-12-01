const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  idItem: Number,
  quantidadeItem: Number,
  valorItem: Number
});

const OrderSchema = new mongoose.Schema({
  numeroPedido: String,
  valorTotal: Number,
  dataCriacao: Date,
  items: [ItemSchema]
});

module.exports = mongoose.model("Order", OrderSchema);
