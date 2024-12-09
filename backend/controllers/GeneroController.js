const GeneroModel = require('../model/GeneroModel.js');

class GeneroController {

    //Método para criar gênero
    async inserir(req, res){
        try {
            const {descricao, tipoGenero} = req.body;

            const generoData = {descricao, tipoGenero};
            const genero = await GeneroModel.criar(generoData);

            res.status(201).json({
                message: 'Gênero criado com sucesso.',
                data: genero.toJSON()
            });
        } catch (error) {
            console.error('Erro ao inserir gênero:', error);
            res.status(500).json({
                message: 'Erro ao inserir gênero.',
                error: error.message
            });
        }
    }

    //Método buscar gêneros por filtro
    async buscarPorFiltro(req, res){
        try {
            const { termo } = req.query;
            const generos = await GeneroModel.buscaPorFiltro(termo);
            if(generos.length === 0){
                return res.status(404).json({
                    message: 'Nenhum gênero encontrado.'
                });
            }
            res.status(200).json({
                message: 'Gêneros encontrados.',
                data: generos.map(genero => genero.toJSON())
            });
        } catch (error) {
            console.error('Erro ao buscar gêneros por filtro:', error);
            res.status(500).json({
                message: 'Erro ao buscar gêneros por filtro.',
                error: error.message
            });
        }
    }

    //Método buscar gêneros por id
    async buscarPorId(req, res){
        try {
            const { id } = req.params;
            const genero = await GeneroModel.buscarPorId(id);

            if(!genero){
                return res.status(404).json({
                    message: 'Gênero não encontrado.'
                });
            }
            res.status(200).json({
                message: 'Gênero encontrado.',
                data: genero.toJSON()
            });
        } catch (error) {
            console.error('Erro ao buscar gênero por id:', error);
            res.status(500).json({
                message: 'Erro ao buscar gênero por id.',
                error: error.message
            });
        }
    }

    //Método excluir gênero por id
    async deletar(req, res){
        try {
            const { id } = req.params;
            const genero = await GeneroModel.buscarPorId(id);

            if(!genero){
                return res.status(404).json({
                    message: 'Gênero não encontrado.'
                });
            }

            await genero.deletar();

            res.status(200).json({
                message: 'Gênero excluido com sucesso.',
                data: genero.toJSON()
            });
        } catch (error) {
            console.error('Erro ao excluir gênero:', error);
            res.status(500).json({
                message: 'Erro ao excluir gênero.',
                error: error.message
            });
        }
    }

    //Método atualizar gênero por id
    async atualizar(req, res){
        try {
            const { id } = req.params;
            const {descricao, tipoGenero} = req.body;

            const genero = await GeneroModel.buscarPorId(id);

            if(!genero){
                return res.status(404).json({
                    message: 'Gênero não encontrado.'
                });
            }

            genero.descricao = descricao;
            genero.tipoGenero = tipoGenero;

            await genero.atualizar();

            res.status(200).json({
                message: 'Gênero atualizado com sucesso.',
                data: genero.toJSON()
            });
        } catch (error) {
            console.error('Erro ao atualizar gênero:', error);
            res.status(500).json({
                message: 'Erro ao atualizar gênero.',
                error: error.message
            });
        }
    }
}

module.exports = new GeneroController();