const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Define options for Swagger
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',  // Swagger specification version
        info: {
            title: 'User API', // API title
            description: 'API documentation for user management', // API description
            version: '1.0.0', // API version
        },
        servers: [
            {
                url: 'http://localhost:3000/api', // Base URL of the API
            },
        ],
    },
    // Path to the files containing documentation comments
    apis: ['./src/interfaces/routes/*.js', './src/interfaces/controllers/*.js'],
};

// Generate Swagger documentation from comments
const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
