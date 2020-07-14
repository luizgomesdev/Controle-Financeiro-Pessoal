import logger from "../config/logger.js";
import transactionModel from "../models/transactionsModel.js";

const formatCurrency = (value) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

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
    const yearMonth = req.params.yearMonth;
    const response = await transactionModel.find({ yearMonth: yearMonth });

    const totalReleases = response.length;

    const totalRecipes = response
      .filter((entry) => {
        return entry.type === "+";
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
      }, 0);

    const totalExpenses = response
      .filter((entry) => {
        return entry.type === "-";
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
      }, 0);

    const finalBalance = totalRecipes - totalExpenses;

    const object = {
      totalReleases: formatCurrency(totalReleases),
      totalRecipes: formatCurrency(totalRecipes),
      totalExpenses: formatCurrency(totalExpenses),
      finalBalance: formatCurrency(finalBalance),
      releases: response,
    };

    res.status(200).send(object);
  } catch (error) {
    logger.info(error);
    res.status(500).send({
      message: error,
    });
  }
};
