require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");

const { connectDatabase } = require("./database");
const orderRoutes = require("./routes/orderRoutes");
const swaggerDocument = require("./swagger.json");

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota raiz só para teste rápido
app.get("/", (req, res) => {
  res.json({ message: "API de pedidos está rodando " });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username !== process.env.AUTH_USER ||
    password !== process.env.AUTH_PASSWORD
  ) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.json({ token });
});

// Rota de documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas de pedidos (já protegidas com JWT lá no arquivo de rotas)
app.use("/", orderRoutes);

// Middleware de erro genérico (fallback)
app.use((err, req, res, next) => {
  console.error("Erro inesperado:", err);
  return res
    .status(500)
    .json({ message: "Erro interno no servidor. Tente novamente." });
});

// Sobe o servidor só depois de conectar no banco
const PORT = process.env.PORT || 3000;

connectDatabase(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(` Servidor rodando na porta ${PORT}`);
    console.log(` Swagger: http://localhost:${PORT}/api-docs`);
  });
});
