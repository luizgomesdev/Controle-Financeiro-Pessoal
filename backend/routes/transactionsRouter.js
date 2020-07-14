import express from "express";
import {
  everyMonthRegistred,
  monthlyFilter,
} from "../controllers/transactionsController.js";

const transactionsRouter = express.Router();

transactionsRouter.get("/everyMonthRegistred", everyMonthRegistred);
transactionsRouter.get("/monthlyFilter/:yearMonth", monthlyFilter);

export default transactionsRouter;
