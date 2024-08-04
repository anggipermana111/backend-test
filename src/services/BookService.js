const Book = require('../models/Book');
const { Op } = require('sequelize');

const getAllBooks = async () => {
  try {
    const books = await Book.findAll();
    return books;
  } catch (error) {
    throw new Error('Error fetching books');
  }
};

const getAvailableBooks = async () => {
  try {
    const books = await Book.findAll({ where: { stock: { [Op.gt]: 0 } } });
    return books;
  } catch (error) {
    throw new Error('Error fetching available books');
  }
};

module.exports = { getAllBooks, getAvailableBooks };
