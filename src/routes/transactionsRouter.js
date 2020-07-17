import express from "express";
import bodyParser from "body-parser";

// create application/json parser
const jsonParser = bodyParser.json();

import {
  everyMonthRegistred,
  dataMonthlyFilter,
  createEntry,
  updateEntry,
  deleteEntry,
  allCategories,
  findByDate,
} from "../controllers/transactionsController.js";

const transactionsRouter = express.Router();

transactionsRouter.get("/everyMonthRegistred", everyMonthRegistred);
transactionsRouter.get("/allCategories", allCategories);
transactionsRouter.get("/monthlyFilter/:yearMonth", dataMonthlyFilter);
transactionsRouter.get("/findByDate/:yearMonth", findByDate);
transactionsRouter.post("/createEntry", jsonParser, createEntry);
transactionsRouter.put("/updateEntry/:id", jsonParser, updateEntry);
transactionsRouter.delete("/deleteEntry/:id", deleteEntry);

export default transactionsRouter;
