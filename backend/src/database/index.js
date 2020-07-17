import mongoose from "mongoose";
import logger from "../config/logger.js";

const connectMongoDB = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info("Conectado ao banco de dados");
  } catch (erro) {    
    logger.error(`Erro ao conectar no banco de dados! ${erro}`);
  }
};

export default connectMongoDB;
