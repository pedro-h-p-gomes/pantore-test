const express = require('express');
const UsuarioController = require('../controllers/UserController');

const router = express.Router();

// Rota para criar um novo usuário
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Criação de um novo usuário
 *     description: Cria um novo usuário com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               funcao:
 *                 type: string
 *                 enum: [admin, cliente]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *                     funcao:
 *                       type: string
 *       400:
 *         description: Erro na criação do usuário
 */
router.post('/usuarios', UsuarioController.cadastrar);

// Rota para login de usuário
// src/interfaces/routes/userRoutes.js
/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Login de um usuário
 *     description: Autentica um usuário e retorna um token JWT para acesso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 token:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *                     funcao:
 *                       type: string
 *       401:
 *         description: Usuário ou senha inválidos
 */
router.post('/usuarios/login', UsuarioController.login);

// Rota para atualizar um usuário existente
/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualizar dados de um usuário
 *     description: Atualiza as informações de um usuário pelo seu ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               funcao:
 *                 type: string
 *                 enum: [admin, cliente]
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 funcao:
 *                   type: string
 *       400:
 *         description: Erro na atualização do usuário
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/usuarios/:id', UsuarioController.atualizar);

// Rota para listar todos os usuários
// src/interfaces/routes/userRoutes.js
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Listar todos os usuários
 *     description: Retorna uma lista de todos os usuários cadastrados
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *                   funcao:
 *                     type: string
 */
router.get('/usuarios', UsuarioController.listarTodos);

// Rota para busca dinâmica de usuários
// src/interfaces/routes/userRoutes.js
/**
 * @swagger
 * /usuarios/busca:
 *   get:
 *     summary: Busca de usuários com filtros
 *     description: Retorna uma lista de usuários com base em filtros de nome, email ou função
 *     parameters:
 *       - name: nome
 *         in: query
 *         description: Filtro de nome do usuário
 *         required: false
 *         schema:
 *           type: string
 *       - name: email
 *         in: query
 *         description: Filtro de email do usuário
 *         required: false
 *         schema:
 *           type: string
 *       - name: funcao
 *         in: query
 *         description: Filtro de função do usuário
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuários encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *                   funcao:
 *                     type: string
 *       400:
 *         description: Erro na busca de usuários
 */
router.get('/usuarios/busca', UsuarioController.buscarComFiltros);

// Rota para buscar um usuário específico pelo ID
/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     description: Retorna os dados de um usuário específico pelo seu ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 funcao:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/usuarios/:id', UsuarioController.buscarPorId);

// Rota de delecao de usuarios
/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Excluir um usuário
 *     description: Exclui um usuário do sistema pelo seu ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/usuarios/:id', UsuarioController.deletar);

//Rota de atualizacao parcial de usuarios (patch)
/**
 * @swagger
 * /usuarios/{id}:
 *   patch:
 *     summary: Atualizar parcialmente um usuário
 *     description: Atualiza os dados de um usuário, apenas os campos fornecidos.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         description: Dados a serem atualizados
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *             email:
 *               type: string
 *             senha:
 *               type: string
 *             funcao:
 *               type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.patch('/usuarios/:id', UsuarioController.atualizarParcial);


module.exports = router;
