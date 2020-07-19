import express from "express";

import logger from "../config/logger.js";
import transactionModel from "../models/transactionsModel.js";

// const formatCurrency = (value) => {
//   return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
// };

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

export const findByDate = async (req, res) => {
  try {
    const { yearMonth } = req.params;

    const response = await transactionModel.find({ yearMonth: yearMonth });
    res.status(200).send(response);
  } catch (error) {
    logger.info(error);
    res.status(500).send({
      message: error,
    });
  }
};

export const allCategories = async (req, res) => {
  try {
    const response = await transactionModel.distinct("category");

    res.status(200).send(response);
  } catch (error) {
    logger.info(error);
    res.status(500).send({
      message: error,
    });
  }
};

export const findByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const response = await transactionModel.find({ category: category });
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

    const newDate = new Date(date);

    const day =
      newDate.getDay() > 10 ? newDate.getDay() : `0${newDate.getDay()}`;
    const month =
      newDate.getMonth() > 10 ? newDate.getMonth() : `0${newDate.getMonth()}`;

    const entry = {
      description: description,
      value: parseInt(value),
      category: category,
      year: newDate.getFullYear(),
      month: parseInt(month),
      day: parseInt(day),
      yearMonth: `${newDate.getFullYear()}-${parseInt(month)}`,
      yearMonthDay: `${newDate.getFullYear()}-${parseInt(month)}-${parseInt(
        day
      )}`,

      type: type,
    };

    const response = await transactionModel.create(entry);

    logger.error(`Nova transação crianda na base: ${response}`);
    res.status(200).send(response);
  } catch (error) {
    logger.error(error);
    res.status(500).send({
      message: error,
    });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const { description, value, category, type, date } = req.body;

    const newDate = new Date(date);

    const day =
      newDate.getDay() > 10 ? newDate.getDay() : `0${newDate.getDay()}`;
    const month =
      newDate.getMonth() > 10 ? newDate.getMonth() : `0${newDate.getMonth()}`;

    const newEntry = {
      description: description,
      value: parseInt(value),
      category: category,
      year: newDate.getFullYear(),
      month: parseInt(month, 10),
      day: parseInt(day, 10),
      yearMonth: `${newDate.getFullYear()}-${month}`,
      yearMonthDay: `${newDate.getFullYear()}-${month}-${day}`,

      type: type,
    };

    const response = await transactionModel.findOneAndUpdate(
      { _id: req.params.id },
      newEntry,
      { new: true }
    );

    logger.error(`Nova atualização no banco: ${response}`);
    res.status(200).send(response);
  } catch (error) {
    logger.error(error);
    res.status(500).send({
      message: error,
    });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const response = await transactionModel.findByIdAndDelete(req.params.id);

    if (!response) {
      res.status(404).send(`Documento não encontrado na coleção:${response}`);
    }

    logger.error(`Deletado com sucesso: ${response}`);
    res.status(200).send(response);
  } catch (error) {
    logger.error(error);
    res.status(500).send({
      message: error,
    });
  }
};
