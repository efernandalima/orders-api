// Rotas de CRUD de pedidos
const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

//  Aplica JWT em TODAS as rotas abaixo
router.use(authMiddleware);

/**
 * Faz o mapeamento do JSON de entrada (formato do desafio)
 * para o formato salvo no banco (orderId, value, creationDate, items).
 */
function mapToOrder(body) {
  return {
    orderId: body.numeroPedido,
    value: body.valorTotal,
    creationDate: new Date(body.dataCriacao),
    items: body.items.map((item) => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  };
}

/**
 * Valida os campos obrigatórios do POST.
 * Retorna array de erros (vazio se estiver tudo ok).
 */
function validateCreateBody(body) {
  const errors = [];

  if (!body.numeroPedido) errors.push("numeroPedido é obrigatório");
  if (body.valorTotal === undefined) errors.push("valorTotal é obrigatório");
  if (!body.dataCriacao) errors.push("dataCriacao é obrigatório");

  if (!Array.isArray(body.items) || body.items.length === 0) {
    errors.push("items deve ser uma lista com pelo menos 1 item");
  } else {
    body.items.forEach((item, index) => {
      if (!item.idItem) errors.push(`items[${index}].idItem é obrigatório`);
      if (item.quantidadeItem === undefined)
        errors.push(`items[${index}].quantidadeItem é obrigatório`);
      if (item.valorItem === undefined)
        errors.push(`items[${index}].valorItem é obrigatório`);
    });
  }

  return errors;
}

/*  LISTAR TODOS (GET /order/list)
 */
router.get("/order/list", async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error.message);
    return res.status(500).json({ message: "Erro ao listar pedidos" });
  }
});

/*CRIAR PEDIDO (POST /order) */
router.post("/order", async (req, res) => {
  try {
    const validationErrors = validateCreateBody(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: validationErrors,
      });
    }

    const mappedOrder = mapToOrder(req.body);

    const newOrder = await Order.create(mappedOrder);

    // Busca o documento completo após salvar
    const savedOrder = await Order.findById(newOrder._id);

    return res.status(201).json(savedOrder);
  } catch (error) {
    // Tratamento específico para orderId duplicado
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Já existe um pedido com esse orderId" });
    }

    console.error("Erro ao criar pedido:", error.message);
    return res.status(500).json({ message: "Erro ao criar pedido" });
  }
});

/*  BUSCAR PEDIDO POR ID (GET /order/:orderId) */
router.get("/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Erro ao buscar pedido:", error.message);
    return res.status(500).json({ message: "Erro ao buscar pedido" });
  }
});

/*  ATUALIZAR PEDIDO (PUT /order/:orderId) */
router.put("/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    // Campos que podem ser atualizados
    const allowedFields = ["value", "creationDate", "items"];
    const dataToUpdate = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        dataToUpdate[field] = req.body[field];
      }
    });

    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({
        message:
          "Nenhum campo válido para atualizar. Use value, creationDate ou items.",
      });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      dataToUpdate,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error.message);
    return res.status(500).json({ message: "Erro ao atualizar pedido" });
  }
});

/* DELETAR PEDIDO (DELETE /order/:orderId)
*/
router.delete("/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.findOneAndDelete({ orderId });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    return res.status(200).json({ message: "Pedido removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover pedido:", error.message);
    return res.status(500).json({ message: "Erro ao remover pedido" });
  }
});

module.exports = router;
