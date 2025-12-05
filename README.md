# 📘 Orders API — Documentação Oficial

API RESTful para gerenciamento de pedidos, construída em **Node.js**, **Express**, **MongoDB** e **JWT**, com documentação completa via **Swagger**.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Swagger
- Dotenv
- Cors
- Nodemon

---

## 📁 Estrutura do Projeto

```
src/
  app.js
  database.js
  models/
    Order.js
  routes/
    orderRoutes.js
  middlewares/
    auth.js
  swagger.json
.env
package.json
```

---

## ⚙️ Configuração e Execução

### 1️⃣ Clonar o repositório

```
git clone https://github.com/efernandalima/orders-api.git
cd orders-api
```

### 2️⃣ Instalar dependências

```
npm install
```

### 3️⃣ Criar arquivo .env

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/ordersdb
AUTH_USER=admin
AUTH_PASSWORD=123456
JWT_SECRET=uma_chave_super_secreta
```

### 4️⃣ Rodar o projeto

```
npm run dev
```

Swagger: http://localhost:3000/api-docs

---

## 🔐 Autenticação

### POST /login

```
{
  "username": "<seu-usuario>",
  "password": "<sua-senha>"
}
```

Retorno:

```
{
  "token": "jwt-gerado"
}
```

Enviar nas rotas protegidas:

```
Authorization: Bearer <token>
```

---

## 📦 Endpoints (CRUD)

### Criar Pedido — POST /order

### Buscar Pedido — GET /order/:orderId

### Listar Pedidos — GET /order/list

### Atualizar Pedido — PUT /order/:orderId

### Remover Pedido — DELETE /order/:orderId

---

## 📚 Swagger

Acesse:
http://localhost:3000/api-docs

---

## 🤝 Contribuição

Pull requests são bem-vindos.

## 📜 Licença

MIT
