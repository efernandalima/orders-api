const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Função de mapeamento: transforma o JSON recebido no JSON do banco
function mapToOrder(body) {
  return {
    orderId: body.numeroPedido,
    value: body.valorTotal,
    creationDate: new Date(body.dataCriacao),
    items: body.items.map((item) => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };
}

// Endpoint de criação de pedido
router.post("/order", async (req, res) => {
  try {
    const mappedOrder = mapToOrder(req.body);
    const newOrder = await Order.create(mappedOrder);

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error(" Erro ao criar pedido:", error.message);
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
