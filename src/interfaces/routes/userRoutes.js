const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Route to create a new user
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, client]
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Error creating the user
 */
router.post('/users', UserController.register);

// Route for user login
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token for access
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Invalid user or password
 */
router.post('/users/login', UserController.login);

// Route to update an existing user
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user data
 *     description: Updates a user's information by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, client]
 *     responses:
 *       200:
 *         description: User successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Error updating the user
 *       404:
 *         description: User not found
 */
router.put('/users/:id', UserController.update);

// Route to list all users
/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     description: Returns a list of all registered users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 */
router.get('/users', UserController.listAll);

// Route for dynamic user search
/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Search users with filters
 *     description: Returns a list of users based on filters for name, email, or role
 *     parameters:
 *       - name: name
 *         in: query
 *         description: User name filter
 *         required: false
 *         schema:
 *           type: string
 *       - name: email
 *         in: query
 *         description: User email filter
 *         required: false
 *         schema:
 *           type: string
 *       - name: role
 *         in: query
 *         description: User role filter
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       400:
 *         description: Error searching for users
 */
router.get('/users/search', UserController.searchWithFilters);

// Route to fetch a specific user by ID
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Fetch user by ID
 *     description: Returns the data of a specific user by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.get('/users/:id', UserController.findById);

// Route to delete a user
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user from the system by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', UserController.delete);

// Route for partial user update
/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Partially update a user
 *     description: Updates only the provided fields of a user.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully updated
 *       404:
 *         description: User not found
 */
router.patch('/users/:id', UserController.partialUpdate);

module.exports = router;
