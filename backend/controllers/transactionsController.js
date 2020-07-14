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

export const dataMonthlyFilter = async (req, res) => {
  try {
    const yearMonth = req.params.yearMonth;
    const response = await transactionModel.find({ yearMonth: yearMonth });

    const totalEntries = response.length;

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
      totalEntries: formatCurrency(totalEntries),
      totalRecipes: formatCurrency(totalRecipes),
      totalExpenses: formatCurrency(totalExpenses),
      finalBalance: formatCurrency(finalBalance),
      Entries: response,
    };

    res.status(200).send(object);
  } catch (error) {
    logger.info(error);
    res.status(500).send({
      message: error,
    });
  }
};

export const createEntry = async (req, res) => {
  try {
    const { description, value, category, type, date } = req.body;

    date = date.replace("/", "-");

    // const entry = {
    //   description: description,
    //   value: parseInt(value),
    //   category: category,
    //   year: Number,
    //   month: Number,
    //   day: Number,
    //   yearMonth: String,
    //   yearMonthDay: String,
    //   type: type,
    // };

    // const response = await transactionModel.create(entry);

    res.status(200).send(date);
  } catch (error) {
    logger.info(error);
    res.status(500).send({
      message: error,
    });
  }
};
