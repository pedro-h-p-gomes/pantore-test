const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario } = require('../../infrastructure/database');
const { Op } = require('sequelize');

class UsuarioServico {
    // Método para criar um novo usuário
    static async criarUsuario({ nome, email, senha, funcao }) {
        // Verificar se o e-mail já existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            throw new Error('E-mail já está em uso.');
        }

        // Gerar hash da senha
        const hashSenha = await bcrypt.hash(senha, 10);

        // Criar e salvar o usuário no banco de dados
        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha: hashSenha,
            funcao,
        });

        return novoUsuario;
    }

    // Método para autenticar o usuário
    static async autenticarUsuario({ email, senha }) {
        // Procurar o usuário pelo e-mail
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            throw new Error('Usuário ou senha inválidos.');
        }

        // Verificar a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error('Usuário ou senha inválidos.');
        }

        // Gerar o token JWT
        const token = jwt.sign(
            { id: usuario.id, funcao: usuario.funcao },
            process.env.JWT_SECRET, // Chave secreta do token
            { expiresIn: '1h' } // Expiração do token
        );

        return { token, usuario };
    }

    // Método para atualizar os dados de um usuário
    static async atualizarUsuario(id, { nome, email, senha, funcao }) {
        // Procurar o usuário pelo ID
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        // Se a senha for fornecida, gerar o hash da nova senha
        if (senha) {
            const hashSenha = await bcrypt.hash(senha, 10);
            senha = hashSenha;
        }

        // Atualizar os dados do usuário
        usuario.nome = nome || usuario.nome;
        usuario.email = email || usuario.email;
        usuario.senha = senha || usuario.senha;
        usuario.funcao = funcao || usuario.funcao;

        // Salvar as alterações no banco de dados
        await usuario.save();

        return usuario;
    }

    // Método para listar todos os usuários
    static async listarTodosUsuarios() {
        try {
            const usuarios = await Usuario.findAll();
            return usuarios;
        } catch (error) {
            throw new Error('Erro ao listar usuários: ' + error.message);
        }
    }

    // Método para buscar um usuário pelo ID
    static async buscarUsuarioPorId(id) {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }
        return usuario;
    }

    // Método para busca dinâmica de usuários (nome, email, funcao)
    static async buscarComFiltros({ nome, email, funcao }) {
        const filtros = {};

        // Se o nome foi passado, aplica o LIKE no nome
        if (nome) {
            filtros.nome = {
                [Op.iLike]: `${nome}%`, // 'iLike' é para busca insensível a maiúsculas/minúsculas no PostgreSQL
            };
        }

        // Se o email foi passado, aplica o LIKE no email
        if (email) {
            filtros.email = {
                [Op.iLike]: `${email}%`,
            };
        }

        // Se a função foi passada, filtra pela função
        if (funcao) {
            filtros.funcao = funcao;
        }

        // Busca com os filtros aplicados
        const usuarios = await Usuario.findAll({
            where: filtros,
        });

        return usuarios;
    }

    // Método para deletar um usuário
    static async deletarUsuario(id) {
        // Procurar o usuário pelo ID
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        // Excluir o usuário do banco de dados
        await usuario.destroy();

        return { mensagem: 'Usuário excluído com sucesso.' };   
    }

    // Método para atualização parcial de um usuário
    static async atualizarParcialUsuario(id, dadosAtualizados) {
        // Procurar o usuário pelo ID
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        // Atualizar os campos fornecidos no objeto dadosAtualizados
        for (const [key, value] of Object.entries(dadosAtualizados)) {
            if (key === 'senha') {
                // Se for a senha, gerar o hash antes de atualizar
                usuario[key] = await bcrypt.hash(value, 10);
            } else {
                usuario[key] = value;
            }
        }

        // Salvar as alterações no banco
        await usuario.save();

        return usuario;
    }

}

module.exports = UsuarioServico;
