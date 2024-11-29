const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definir as opções para o Swagger
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',  // Versão da especificação Swagger
        info: {
            title: 'API de Usuários', // Título da API
            description: 'Documentação da API para gerenciamento de usuários', // Descrição da API
            version: '1.0.0', // Versão da API
        },
        servers: [
            {
                url: 'http://localhost:3000/api', // URL base da API
            },
        ],
    },
    // Caminho para os arquivos que contém os comentários de documentação
    apis: ['./src/interfaces/routes/*.js', './src/interfaces/controllers/*.js'],
};

// Criar a documentação Swagger a partir dos comentários
const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
