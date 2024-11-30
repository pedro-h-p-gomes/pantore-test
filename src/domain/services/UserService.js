const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../infrastructure/database');
const { Op } = require('sequelize');

class UserService {
    // Method to create a new user
    static async createUser({ name, email, password, role }) {
        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email is already in use.');
        }

        // Generate password hash
        const passwordHash = await bcrypt.hash(password, 10);

        // Create and save the user in the database
        const newUser = await User.create({
            name,
            email,
            password: passwordHash,
            role,
        });

        return newUser;
    }

    // Method to authenticate the user
    static async authenticateUser({ email, password }) {
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid email or password.');
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password.');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET, // Secret token key
            { expiresIn: '1h' } // Token expiration time
        );

        return { token, user };
    }

    // Method to update user data
    static async updateUser(id, { name, email, password, role }) {
        // Find the user by ID
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found.');
        }

        // If password is provided, generate hash
        if (password) {
            const passwordHash = await bcrypt.hash(password, 10);
            password = passwordHash;
        }

        // Update user data
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        user.role = role || user.role;

        // Save changes in the database
        await user.save();

        return user;
    }

    // Method to list all users
    static async listAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw new Error('Error listing users: ' + error.message);
        }
    }

    // Method to find a user by ID
    static async findUserById(id) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    }

    // Method for dynamic user search (name, email, role)
    static async searchWithFilters({ name, email, role }) {
        const filters = {};

        // If name is provided, apply LIKE to the name
        if (name) {
            filters.name = {
                [Op.iLike]: `${name}%`, // 'iLike' for case-insensitive search in PostgreSQL
            };
        }

        // If email is provided, apply LIKE to the email
        if (email) {
            filters.email = {
                [Op.iLike]: `${email}%`,
            };
        }

        // If role is provided, filter by role
        if (role) {
            filters.role = role;
        }

        // Search with applied filters
        const users = await User.findAll({
            where: filters,
        });

        return users;
    }

    // Method to delete a user
    static async deleteUser(id) {
        // Find the user by ID
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found.');
        }

        // Delete the user from the database
        await user.destroy();

        return { message: 'User successfully deleted.' };
    }

    // Method for partial user updates
    static async updatePartialUser(id, updatedData) {
        // Find the user by ID
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found.');
        }

        // Update fields provided in the updatedData object
        for (const [key, value] of Object.entries(updatedData)) {
            if (key === 'password') {
                // If it's a password, hash it before updating
                user[key] = await bcrypt.hash(value, 10);
            } else {
                user[key] = value;
            }
        }

        // Save changes in the database
        await user.save();

        return user;
    }
}

module.exports = UserService;
