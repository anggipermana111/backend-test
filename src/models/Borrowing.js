const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Book = require('./Book');
const Member = require('./Member');

const Borrowing = sequelize.define('Borrowing', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  member_id: {
    type: DataTypes.STRING,
    references: {
      model: Member,
      key: 'code',
    },
  },
  book_id: {
    type: DataTypes.STRING,
    references: {
      model: Book,
      key: 'code',
    },
  },
  borrowed_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'borrowings',
  timestamps: false,
});

module.exports = Borrowing;
