const Member = require('../models/Member');
const Borrowing = require('../models/Borrowing');
const Book = require('../models/Book');
const { Sequelize } = require('sequelize');

// Fungsi untuk meminjam buku
const borrowBook = async (memberId, bookId) => {
  try {
    // Memastikan member ada
    const member = await Member.findByPk(memberId);
    if (!member) throw new Error('Member not found');

    // Memastikan buku tersedia
    const book = await Book.findByPk(bookId);
    if (!book || book.stock <= 0) throw new Error('Book not available');

    // Memastikan member tidak meminjam lebih dari 2 buku
    const activeBorrowings = await Borrowing.count({ where: { member_id: memberId, return_date: null } });
    if (activeBorrowings >= 2) throw new Error('Cannot borrow more than 2 books');

    // Memastikan member tidak sedang dalam masa hukuman
    if (member.penalty_end_date && new Date(member.penalty_end_date) > new Date()) {
      throw new Error('Member is under penalty');
    }

    // Membuat record peminjaman buku
    await Borrowing.create({ member_id: memberId, book_id: bookId, borrowed_date: new Date() });

    // Mengurangi stok buku yang tersedia
    await Book.update({ stock: book.stock - 1 }, { where: { code: bookId } });

    return { message: 'Book borrowed successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fungsi untuk mengembalikan buku
const returnBook = async (memberId, bookId) => {
  try {
    // Mencari record peminjaman yang belum dikembalikan
    const borrowing = await Borrowing.findOne({ where: { member_id: memberId, book_id: bookId, return_date: null } });
    if (!borrowing) throw new Error('Borrowing record not found');

    // Menghitung jumlah hari peminjaman
    const borrowedDate = new Date(borrowing.borrowed_date);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - borrowedDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    // Memberikan hukuman jika pengembalian lebih dari 7 hari
    if (differenceInDays > 7) {
      const penaltyEndDate = new Date();
      penaltyEndDate.setDate(currentDate.getDate() + 3);
      await Member.update({ penalty_end_date: penaltyEndDate }, { where: { code: memberId } });
    }

    // Mengupdate tanggal pengembalian dan stok buku
    await Borrowing.update({ return_date: currentDate }, { where: { id: borrowing.id } });
    await Book.update({ stock: Sequelize.literal('stock + 1') }, { where: { code: bookId } });

    return { message: 'Book returned successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fungsi untuk mendapatkan semua member dan jumlah buku yang dipinjam
const getAllMembers = async () => {
  try {
    // Mendapatkan semua member
    const members = await Member.findAll();
    // Menambahkan informasi jumlah buku yang dipinjam
    const membersWithBorrowings = await Promise.all(
      members.map(async (member) => {
        const borrowings = await Borrowing.findAll({ where: { member_id: member.code, return_date: null } });
        return {
          ...member.dataValues,
          books_borrowed: borrowings.length,
        };
      })
    );
    return membersWithBorrowings;
  } catch (error) {
    throw new Error('Error fetching members');
  }
};

module.exports = { borrowBook, returnBook, getAllMembers };
