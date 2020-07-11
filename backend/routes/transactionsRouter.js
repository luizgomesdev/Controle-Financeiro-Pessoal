import express from "express";
import { teste } from "../controllers/transactionsController.js";

const transactionsRouter = express.Router();

transactionsRouter.get("/", teste);

export default transactionsRouter;
