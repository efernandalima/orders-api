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
// POST – Criar um pedido
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
// GET – Buscar pedido pelo orderId
router.get("/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(" Erro ao buscar pedido:", error.message);
    return res.status(500).json({ error: error.message });
  }
});
// GET – Listar todos os pedidos
router.get("/order/list", async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    console.error(" Erro ao listar pedidos:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
