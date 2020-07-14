import express from "express";
import dontenv from "dotenv";
import connectMongoDB from "./database/index.js";
import transactionsRouter from "./routes/transactionsRouter.js";

//  Faz a leitura do arquivo .env
dontenv.config();
const { MONGODB_URL, PORT } = process.env;

const app = express();

// Configuro minhas APIs para trabalhar com retorno JSON.
app.use(express.json());

// Rotas da aplicação
app.use("/transactions", transactionsRouter);

app.listen(PORT, () => {
  console.log(`Aplicação iniciada na porta ${PORT}!`);
  connectMongoDB(MONGODB_URL);
});
