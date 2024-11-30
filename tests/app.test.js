const request = require('supertest');
const { startServer } = require('../app');
const { sequelize } = require('../src/infrastructure/database');  // Importe o sequelize para fechar a conexão

// Mock do Winston para impedir que ele faça logs reais durante os testes
jest.mock('../src/shared/logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
}));

describe('App', () => {
    let server;

    // Inicia o servidor antes de rodar os testes
    beforeAll(async () => {
        server = await startServer();  // Inicia o servidor
    });

    // O Jest irá executar esta função após TODOS os testes
    afterAll(async () => {
        await sequelize.close();  // Fecha a conexão com o banco de dados
        server.close();  // Fecha o servidor
    });

    // Teste para verificar o funcionamento da documentação Swagger
    it('should respond with a 200 status to /api-docs', async () => {
        const response = await request(server).get('/api-docs');
        expect(response.status).toBe(200);
    });

    // Teste para verificar a resposta para rotas não definidas
    it('should respond with a 404 status for an undefined route', async () => {
        const response = await request(server).get('/undefined-route');
        expect(response.status).toBe(404);
    });
});
