const { borrowBook, returnBook, getAllMembers } = require('../services/MemberService');

const borrowBookController = async (req, res) => {
  const { memberId, bookId } = req.body;
  try {
    const result = await borrowBook(memberId, bookId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const returnBookController = async (req, res) => {
  const { memberId, bookId } = req.body;
  try {
    const result = await returnBook(memberId, bookId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllMembersController = async (req, res) => {
  try {
    const members = await getAllMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { borrowBookController, returnBookController, getAllMembersController };
