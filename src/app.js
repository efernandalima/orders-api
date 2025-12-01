require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./database");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// rotas de pedidos
app.use("/", orderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API de pedidos está rodando " });
});

const PORT = process.env.PORT || 3000;

connectDatabase(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(` Servidor rodando na porta ${PORT}`);
  });
});
