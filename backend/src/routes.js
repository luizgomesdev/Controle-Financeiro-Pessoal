import express from "express";
import transactionsRouter from "./routes/transactionsRouter.js";

const routes = express.Router();

// Rotas da aplicação
routes.use("/transactions", transactionsRouter);

export default routes;
