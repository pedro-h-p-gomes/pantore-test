const { DataTypes } = require('sequelize');

class User {
    constructor(id, name, email, password, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Method: Check if the user is an admin
    isAdmin() {
        return this.role === 'admin';
    }
}

// Sequelize Model for persistence
const UserModel = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'customer'),
            allowNull: false,
        },
    }, {
        tableName: 'users',
        timestamps: true,
    });
};

module.exports = { User, UserModel };
