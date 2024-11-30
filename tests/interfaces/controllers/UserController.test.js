const request = require('supertest');
const app = require('../../../app');

describe('UserController', () => {
    describe('POST /api/users', () => {
        it('should create a new user', async () => {
            const userData = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
                role: 'admin',
            };

            const response = await request(app)
                .post('/api/users')
                .send(userData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'User created successfully');
            expect(response.body.user).toHaveProperty('id');
            expect(response.body.user).toHaveProperty('name', 'John Doe');
        });

        it('should return 400 if required fields are missing', async () => {
            const response = await request(app).post('/api/users').send({});

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Validation error');
        });
    });

    describe('POST /api/users/login', () => {
        it('should log in a user and return a token', async () => {
            const userData = {
                email: 'johndoe@example.com',
                password: 'password123',
            };

            const response = await request(app).post('/api/users/login').send(userData);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should return 401 if credentials are invalid', async () => {
            const userData = {
                email: 'wrongemail@example.com',
                password: 'wrongpassword',
            };

            const response = await request(app).post('/api/users/login').send(userData);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Invalid email or password');
        });
    });
});
