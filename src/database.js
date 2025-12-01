
// Responsável por conectar no MongoDB usando Mongoose

const mongoose = require("mongoose");

/**
 * Conecta no MongoDB.
 * Recebe a string de conexão pelo parâmetro (normalmente do .env).
 */
async function connectDatabase(mongoUri) {
  try {
    await mongoose.connect(mongoUri);
    console.log(" Conectado ao MongoDB");
  } catch (error) {
    console.error(" Erro ao conectar ao MongoDB:", error.message);
    // Se não conectar, não faz sentido o servidor continuar rodando
    process.exit(1);
  }
}

module.exports = { connectDatabase };
