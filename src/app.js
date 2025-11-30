require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// rota inicial só pra teste
app.get("/", (req, res) => {
  res.json({ message: "API de pedidos está rodando " });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`);
});
