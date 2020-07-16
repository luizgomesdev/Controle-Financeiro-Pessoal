import express from "express";

import {
  everyMonthRegistred,
  dataMonthlyFilter,
  createEntry,
} from "../controllers/transactionsController.js";

const transactionsRouter = express.Router();

transactionsRouter.get("/everyMonthRegistred", everyMonthRegistred);
transactionsRouter.get("/monthlyFilter/:yearMonth", dataMonthlyFilter);
transactionsRouter.post("/createEntry", createEntry);

export default transactionsRouter;
