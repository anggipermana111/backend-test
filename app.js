const express = require('express');
const { sequelize, checkConnection } = require('./src/config/database');
const bookRoutes = require('./src/routes/books');
const memberRoutes = require('./src/routes/members');
const { swaggerUi, swaggerSpec } = require('./src/config/swagger');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/books', bookRoutes);
app.use('/members', memberRoutes);

// Error handling middleware
app.use(errorHandler);

// Check database connection and sync models
(async () => {
  try {
    await checkConnection();
    await sequelize.sync(); // Sync all models with database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
