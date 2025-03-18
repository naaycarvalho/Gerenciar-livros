const CategoriaModel = require('../model/CategoriaModel.js');

class CategoriaController {

    //Método para criar categoria
    async inserir(req, res){
        try {
            const {descricao, tipoCategoria} = req.body;

            const categoriaData = {descricao, tipoCategoria};
            const categoria = await CategoriaModel.criar(categoriaData);

            res.status(201).json({
                message: 'Categoria criada com sucesso.',
                data: categoria.toJSON()
            });
        } catch (error) {
            console.error('Erro ao inserir categoria:', error);
            res.status(500).json({
                message: 'Erro ao inserir categoria.',
                error: error.message
            });
        }
    }

    //Método buscar categorias por filtro
    async buscarPorFiltro(req, res){
        try {
            const { termo } = req.query;
            const categorias = await CategoriaModel.buscaPorFiltro(termo);
            if(categorias.length === 0){
                return res.status(404).json({
                    message: 'Nenhuma gcategoria encontrada.'
                });
            }
            res.status(200).json({
                message: 'Categorias encontradas.',
                data: categorias.map(categoria => categoria.toJSON())
            });
        } catch (error) {
            console.error('Erro ao buscar categorias por filtro:', error);
            res.status(500).json({
                message: 'Erro ao buscar categorias por filtro.',
                error: error.message
            });
        }
    }

    //Método buscar categorias por id
    async buscarPorId(req, res){
        try {
            const { id } = req.params;
            const categoria = await CategoriaModel.buscarPorId(id);

            if(!categoria){
                return res.status(404).json({
                    message: 'Categoria não encontrada.'
                });
            }
            res.status(200).json({
                message: 'Categoria encontrada.',
                data: categoria.toJSON()
            });
        } catch (error) {
            console.error('Erro ao buscar categoria por id:', error);
            res.status(500).json({
                message: 'Erro ao buscar categoria por id.',
                error: error.message
            });
        }
    }

    //Método excluir gênero por id
    async deletar(req, res){
        try {
            const { id } = req.params;
            const categoria = await CategoriaModel.buscarPorId(id);

            if(!categoria){
                return res.status(404).json({
                    message: 'categoria não encontrada.'
                });
            }

            await categoria.deletar();

            res.status(200).json({
                message: 'Categoria excluida com sucesso.',
                data: categoria.toJSON()
            });
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
            res.status(500).json({
                message: 'Erro ao excluir categoria.',
                error: error.message
            });
        }
    }

    //Método atualizar categoria por id
    async atualizar(req, res){
        try {
            const { id } = req.params;
            const {descricao, tipoCategoria} = req.body;

            const categoria= await CategoriaModel.buscarPorId(id);

            if(!categoria){
                return res.status(404).json({
                    message: 'Categoria não encontrada.'
                });
            }

            categoria.descricao = descricao;
            categoria.tipoCategoria = tipoCategoria;

            await categoria.atualizar();

            res.status(200).json({
                message: 'Categoria atualizado com sucesso.',
                data: categoria.toJSON()
            });
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            res.status(500).json({
                message: 'Erro ao atualizar categoria.',
                error: error.message
            });
        }
    }
}

module.exports = new CategoriaController();