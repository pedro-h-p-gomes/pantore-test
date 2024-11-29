// app.js
const express = require('express');
const { conectarBanco } = require('./src/infrastructure/database');
const userRoutes = require('./src/interfaces/routes/userRoutes');
require('dotenv').config();
const { swaggerUi, swaggerSpec } = require('./src/shared/swagger'); 
const morgan = require('morgan');
const logger = require('./src/shared/logger');


const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para registrar requisições no Winston
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim()) // Registrar no Winston
    }
}));

// Rota para documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da aplicacao
app.use('/api', userRoutes);

(async () => {
    await conectarBanco();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})();
