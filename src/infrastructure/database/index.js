require('dotenv').config(); // Load environment variables
const { Sequelize } = require('sequelize');
const { UserModel } = require('../../domain/entities/User');
const logger = require('../../shared/logger');

// PostgreSQL database configuration
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);

// Initialize the User model
const User = UserModel(sequelize);

// Function to connect to the database
const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Database connection established.');
        await sequelize.sync({ alter: true });
        logger.info('Models synchronized with the database.');
    } catch (error) {
        logger.error('Error connecting to the database:', error);
    }
};

module.exports = { sequelize, User, connectDatabase };
