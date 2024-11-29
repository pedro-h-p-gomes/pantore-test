require('dotenv').config(); // Carrega variáveis do .env
const { Sequelize } = require('sequelize');
const { UsuarioModelo } = require('../../domain/entities/User');
const logger = require('../../shared/logger');

// Configurações para o banco PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);

// Inicializar o modelo Usuario
const Usuario = UsuarioModelo(sequelize);

// Função para conectar ao banco
const conectarBanco = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Conexão com o banco de dados estabelecida.');
        await sequelize.sync({ alter: true });
        logger.info('Modelos sincronizados com o banco.');
    } catch (error) {
        logger.error('Erro ao conectar no banco:', error);
    }
};

module.exports = { sequelize, Usuario, conectarBanco };
