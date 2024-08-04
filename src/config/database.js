const { Sequelize } = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

const sequelize = new Sequelize(process.env.SUPABASE_DB, process.env.SUPABASE_USER, process.env.SUPABASE_PASSWORD, {
  host: process.env.SUPABASE_HOST,
  port: process.env.SUPABASE_PORT,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Function to check database connection
const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, checkConnection };
