const UserService = require('../../domain/services/UserService');

class UserController {
    // Method to register a new user
    static async register(req, res) {
        const { name, email, password, role } = req.body;

        try {
            // Call the service to create the user
            const newUser = await UserService.createUser({ name, email, password, role });

            return res.status(201).json({
                message: 'User successfully created.',
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                },
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Method to authenticate the user (login)
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const { token, user } = await UserService.authenticateUser({ email, password });

            return res.status(200).json({
                message: 'Login successful.',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    // Method to update user data
    static async update(req, res) {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        try {
            // Call the service to update the user
            const updatedUser = await UserService.updateUser(id, { name, email, password, role });

            return res.status(200).json({
                message: 'User successfully updated.',
                user: {
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role,
                },
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Method to list all users
    static async listAll(req, res) {
        try {
            const users = await UserService.listAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Method to fetch a specific user by ID
    static async findById(req, res) {
        const { id } = req.params;

        try {
            const user = await UserService.findUserById(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    // Method for dynamic user search (name, email, role)
    static async searchWithFilters(req, res) {
        const { name, email, role } = req.query; // Retrieve filters from query string

        try {
            const users = await UserService.searchWithFilters({ name, email, role });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Method to delete a user
    static async delete(req, res) {
        const { id } = req.params;

        try {
            // Call the service to delete the user
            const result = await UserService.deleteUser(id);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    // Method to partially update a user
    static async partialUpdate(req, res) {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            // Call the service to update the user
            const updatedUser = await UserService.partialUpdateUser(id, updatedData);

            return res.status(200).json({
                message: 'User successfully updated.',
                user: {
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role,
                },
            });
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = UserController;
