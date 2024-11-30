const express = require('express');
const { connectDatabase } = require('./src/infrastructure/database');
const userRoutes = require('./src/interfaces/routes/userRoutes');
require('dotenv').config();
const { swaggerUi, swaggerSpec } = require('./src/shared/swagger');
const morgan = require('morgan');
const logger = require('./src/shared/logger');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to log requests using Winston
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim()) // Log with Winston
    }
}));

// Route for Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Application routes
app.use('/api', userRoutes);

// Export the app and the server instance
const startServer = async () => {
    await connectDatabase();

    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    // Export the app and server for testing purposes
    return server; // Export the server for testing purposes
};

// Start the server
startServer();
