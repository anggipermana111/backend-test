const { getAllBooks, getAvailableBooks } = require('../services/BookService');

const getAllBooksController = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAvailableBooksController = async (req, res) => {
  try {
    const books = await getAvailableBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllBooksController, getAvailableBooksController };
