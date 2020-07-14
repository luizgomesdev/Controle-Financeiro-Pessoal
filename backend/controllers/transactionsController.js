import logger from "../config/logger.js";
import transactionModel from "../models/transactionsModel.js";

export const everyMonthRegistred = async (req, res) => {
  try {
    const response = await transactionModel.distinct("yearMonth");
    res.status(200).send(response);
  } catch (error) {
    logger.info(error);
    res.status(500).send({
      message: error,
    });
  }
};
export const monthlyFilter = async (req, res) => {
  try {
    const yearMonth = req.params;
    const response = await transactionModel.find("yearMonth");

    res.status(200).send(response);
  } catch (error) {
    logger.info(error);
    res.status(500).send({
      message: error,
    });
  }
};
