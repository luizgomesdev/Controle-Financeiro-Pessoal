import express from "express";
import { everyMonthRegistred } from "../controllers/transactionsController.js";

const transactionsRouter = express.Router();

transactionsRouter.get("/everyMonthRegistred", everyMonthRegistred);

export default transactionsRouter;
