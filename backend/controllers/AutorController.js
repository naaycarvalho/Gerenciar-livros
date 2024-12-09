const AutorModel = require('../model/AutorModel.js');

class AutorController {

    //metodo para criar autor 
    async inserir(req, res) {
        try {
            const { Nome, Sobrenome, Nacionalidade, DataDeNascimento, Biografia } = req.body;
            const autorData = { Nome, Sobrenome, Nacionalidade, DataDeNascimento, Biografia };
            const autor = await AutorModel.criar(autorData);
            res.status(201).json({
                message: 'Autor criado com sucesso.',
                data: autor.toJSON()
            });
        } catch (error) {
            console.error('Erro ao inserir autor:', error);
            res.status(500).json({
                message: 'Erro ao inserir autor.',
                error: error.message
            });
        }
    }

    //metodo para buscar autor por filtro
    async buscarPorFiltro(req, res) {
        try {
            const { termo } = req.query;
            const autores = await AutorModel.buscarPorFiltro(termo);
            if (autores.length === 0) {
                return res.status(404).json({
                    message: 'Nenhum autor encontrado.'
                });
            }
            res.status(200).json({
                message: 'Autores encontrados.',
                data: autores.map(autor => autor.toJSON())
            });
        } catch (error) {
            console.error('Erro ao buscar autores por filtro:', error);
            res.status(500).json({
                message: 'Erro ao buscar autores por filtro.',
                error: error.message
            });
        }
    }

    //metodo para buscar autor por id
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const autor = await AutorModel.buscarPorId(id);
            if (!autor) {
                return res.status(404).json({                
                    message: 'Autor nao encontrado.'
                });
            }    
            res.status(200).json({
                message: 'Autor encontrado.',
                data: autor.toJSON()
            });
        } catch (error) {           
            console.error('Erro ao buscar autor por id:', error);
            res.status(500).json({
                message: 'Erro ao buscar autor por id.',
                error: error.message
            });
        }
    }

    //metodo para excluir autor por id
    async deletar(req, res) {
        try {
            const { id } = req.params;
            const autor = await AutorModel.buscarPorId(id);
            if (!autor) {
                return res.status(404).json({
                    message: 'Autor nao encontrado.'
                });
            }
            await autor.deletar();
            res.status(200).json({
                message: 'Autor excluido com sucesso.',
                data: autor.toJSON()
            });
        } catch (error) {
            console.error('Erro ao excluir autor:', error);
            res.status(500).json({
                message: 'Erro ao excluir autor.',
                error: error.message
            });
        }
    }

    //metodo para atualizar autor por id
    async atualizar(req, res) { 
        try {
            const { id } = req.params;
            const autorData = req.body;
            const autor = await AutorModel.buscarPorId(id); 
            if (!autor) {
                return res.status(404).json({                
                    message: 'Autor nao encontrado.'
                });
            }    
            await autor.atualizar(autorData);
            const autorAtualizado = await AutorModel.buscarPorId(id);
            res.status(200).json({
                message: 'Autor atualizado com sucesso.',
                data: autorAtualizado.toJSON()
            });
        } catch (error) {           
            console.error('Erro ao atualizar autor:', error);
            res.status(500).json({
                message: 'Erro ao atualizar autor.',
                error: error.message
            });
        }
    }       

}

module.exports = new AutorController();