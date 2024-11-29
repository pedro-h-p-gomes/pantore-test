// src/domain/entities/User.js
const { DataTypes } = require('sequelize');

class Usuario {
    constructor(id, nome, email, senha, funcao) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.funcao = funcao;
    }
    
    // Método: Verificar se o usuário é admin
    ehAdmin() {
        return this.funcao === 'admin';
    }
}

// Modelo Sequelize para persistência
const UsuarioModelo = (sequelize) => {
    return sequelize.define('Usuario', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        funcao: {
            type: DataTypes.ENUM('admin', 'cliente'),
            allowNull: false,
        },
    }, {
        tableName: 'usuarios',
        timestamps: true,
    });
};

module.exports = { Usuario, UsuarioModelo };
