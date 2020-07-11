import express from "express";
import dontenv from "dotenv";

import connectMongoDB from "./database/index.js";

dontenv.config();

const { MONGODB_URL, PORT } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`Aplicação iniciada na porta ${PORT}!`);
    connectMongoDB(MONGODB_URL);
});
