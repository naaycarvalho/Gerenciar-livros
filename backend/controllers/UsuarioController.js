const UsuarioModel = require('../model/UsuarioModel.js');

class UsuarioController {

    //Método para criar usuário
    async inserir(req, res){
        try {
            const {nome, cpf, dataNascimento, endereco, cep, telefone, email, tipoUsuario} = req.body;

            const usuarioData = {nome, cpf, dataNascimento, endereco, cep, telefone, email, tipoUsuario};
            const usuario = await UsuarioModel.criar(usuarioData);

            res.status(201).json({
                message: 'Usuário criado com sucesso.',
                data: usuario.toJSON()
            });
        } catch (error) {
            console.error('Erro ao inserir usuário:', error);
            res.status(500).json({
                message: 'Erro ao inserir usuário.',
                error: error.message
            });
        }
    }

    //Método buscar usuário por filtro
    async buscarPorFiltro(req, res){
        try {
            const { termo } = req.query;
            const usuarios = await UsuarioModel.buscaPorFiltro(termo);
            if(usuarios.length === 0){
                return res.status(404).json({
                    message: 'Nenhum usuário encontrado.'
                });
            }
            res.status(200).json({
                message: 'Usuários encontrados.',
                data: usuarios.map(usuario => usuario.toJSON())
            });
        } catch (error) {
            console.error('Erro ao buscar usuários por filtro:', error);
            res.status(500).json({
                message: 'Erro ao buscar usuários por filtro.',
                error: error.message
            });
        }
    }

    //Método buscar usuário por id
    async buscarPorId(req, res){
        try {
            const { id } = req.params;
            const usuario = await UsuarioModel.buscarPorId(id);

            if(!usuario){
                return res.status(404).json({
                    message: 'Usuário não encontrado.'
                });
            }
            res.status(200).json({
                message: 'Usuário encontrado.',
                data: usuario.toJSON()
            });
        } catch (error) {
            console.error('Erro ao buscar usuário por id:', error);
            res.status(500).json({
                message: 'Erro ao buscar usuário por id.',
                error: error.message
            });
        }
    }

    //Método excluir usuário por id
    async deletar(req, res){
        try {
            const { id } = req.params;
            const usuario = await UsuarioModel.buscarPorId(id);

            if(!usuario){
                return res.status(404).json({
                    message: 'Usuário não encontrado.'
                });
            }

            await usuario.deletar();

            res.status(200).json({
                message: 'Usuário excluido com sucesso.',
                data: usuario.toJSON()
            });
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            res.status(500).json({
                message: 'Erro ao excluir usuário.',
                error: error.message
            });
        }
    }

    //Método atualizar usuário por id
    async atualizar(req, res){
        try {
            const { id } = req.params;
            const {nome, cpf, dataNascimento, endereco, cep, telefone, email, tipoUsuario} = req.body;

            const usuario = await UsuarioModel.buscarPorId(id);

            if(!usuario){
                return res.status(404).json({
                    message: 'Usuário não encontrado.'
                });
            }

            usuario.nome = nome;
            usuario.cpf = cpf;
            usuario.dataNascimento = dataNascimento;
            usuario.endereco = endereco;
            usuario.cep = cep;
            usuario.telefone = telefone;
            usuario.email = email;
            usuario.tipoUsuario = tipoUsuario;

            await usuario.atualizar();

            res.status(200).json({
                message: 'Usuário atualizado com sucesso.',
                data: usuario.toJSON()
            });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({
                message: 'Erro ao atualizar usuário.',
                error: error.message
            });
        }
    }
}

module.exports = new UsuarioController();