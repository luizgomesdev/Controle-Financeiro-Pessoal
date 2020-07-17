import express from "express";

import transactionsRouter from "./transactionsRouter.js";

const routes = express.Router();

// Rotas da aplicação
routes.use("/api/transactions", transactionsRouter);

export default routes;
