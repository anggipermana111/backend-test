const express = require('express');
const { borrowBookController, returnBookController, getAllMembersController } = require('../controllers/MemberController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - code
 *         - name
 *       properties:
 *         code:
 *           type: string
 *           description: The member code
 *         name:
 *           type: string
 *           description: The member name
 *       example:
 *         code: M001
 *         name: Angga
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Retrieve a list of all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get('/', getAllMembersController);

/**
 * @swagger
 * /members/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberId
 *               - bookId
 *             properties:
 *               memberId:
 *                 type: string
 *                 example: M001
 *               bookId:
 *                 type: string
 *                 example: JK-45
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Error in borrowing book
 */
router.post('/borrow', borrowBookController);

/**
 * @swagger
 * /members/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberId
 *               - bookId
 *             properties:
 *               memberId:
 *                 type: string
 *                 example: M001
 *               bookId:
 *                 type: string
 *                 example: JK-45
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Error in returning book
 */
router.post('/return', returnBookController);

module.exports = router;
