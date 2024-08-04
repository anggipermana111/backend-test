const express = require('express');
const { getAllBooksController, getAvailableBooksController } = require('../controllers/BookController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - code
 *         - title
 *         - author
 *         - stock
 *       properties:
 *         code:
 *           type: string
 *           description: The book code
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *         stock:
 *           type: integer
 *           description: The number of available copies of the book
 *       example:
 *         code: JK-45
 *         title: Harry Potter
 *         author: J.K Rowling
 *         stock: 1
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', getAllBooksController);

/**
 * @swagger
 * /books/available:
 *   get:
 *     summary: Retrieve a list of available books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of available books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/available', getAvailableBooksController);

module.exports = router;
