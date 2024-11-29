const UsuarioServico = require('../../domain/services/UserService');

class UsuarioController {
    // Método para cadastrar um novo usuário
    static async cadastrar(req, res) {
        const { nome, email, senha, funcao } = req.body;

        try {
            // Chamar o serviço para criar o usuário
            const novoUsuario = await UsuarioServico.criarUsuario({ nome, email, senha, funcao });

            return res.status(201).json({
                mensagem: 'Usuário criado com sucesso.',
                usuario: {
                    id: novoUsuario.id,
                    nome: novoUsuario.nome,
                    email: novoUsuario.email,
                    funcao: novoUsuario.funcao,
                },
            });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    // Método para autenticar o usuário (login)
    static async login(req, res) {
        const { email, senha } = req.body;

        try {
            const { token, usuario } = await UsuarioServico.autenticarUsuario({ email, senha });

            return res.status(200).json({
                mensagem: 'Login realizado com sucesso.',
                token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    funcao: usuario.funcao,
                },
            });
        } catch (error) {
            return res.status(401).json({ erro: error.message });
        }
    }

    // Método para atualizar os dados de um usuário
    static async atualizar(req, res) {
        const { id } = req.params;
        const { nome, email, senha, funcao } = req.body;

        try {
            // Chamar o serviço para atualizar o usuário
            const usuarioAtualizado = await UsuarioServico.atualizarUsuario( id, { nome, email, senha, funcao });

            return res.status(200).json({
                mensagem: 'Usuário atualizado com sucesso.',
                usuario: {
                    id: usuarioAtualizado.id,
                    nome: usuarioAtualizado.nome,
                    email: usuarioAtualizado.email,
                    funcao: usuarioAtualizado.funcao,
                },
            });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    // Método para listar todos os usuários
    static async listarTodos(req, res) {
        try {
            const usuarios = await UsuarioServico.listarTodosUsuarios();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    // Método para buscar um usuário específico pelo ID
    static async buscarPorId(req, res) {
        const { id } = req.params;

        try {
            const usuario = await UsuarioServico.buscarUsuarioPorId(id);
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }

    // Método para busca dinâmica de usuários (nome, email, funcao)
    static async buscarComFiltros(req, res) {
        const { nome, email, funcao } = req.query; // Recuperando os filtros da query string

        try {
            const usuarios = await UsuarioServico.buscarComFiltros({ nome, email, funcao });
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    // Método para deletar um usuário
    static async deletar(req, res) {
        const { id } = req.params;

        try {
            // Chamar o serviço para deletar o usuário
            const resultado = await UsuarioServico.deletarUsuario(id);

            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }

    // Método para atualização parcial de um usuário
    static async atualizarParcial(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        try {
            // Chamar o serviço para atualizar o usuário
            const usuarioAtualizado = await UsuarioServico.atualizarParcialUsuario(id, dadosAtualizados);

            return res.status(200).json({
                mensagem: 'Usuário atualizado com sucesso.',
                usuario: {
                    id: usuarioAtualizado.id,
                    nome: usuarioAtualizado.nome,
                    email: usuarioAtualizado.email,
                    funcao: usuarioAtualizado.funcao,
                },
            });
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }

}

module.exports = UsuarioController;
