const LivrosModel = require('../model/LivrosModel.js');

class LivrosController {
 
    //metodo para criar livro
    async inserir(req, res) {
        try {
            const { Titulo, Autor, Editora, Ano, ISBN, NumeroDePaginas, Genero, Estado, Tombo, DataDeCadastro, Observacoes, Categoria } = req.body;
            
            const livroData = { Titulo, Autor, Editora, Ano, ISBN, NumeroDePaginas, Genero, Estado, Tombo, DataDeCadastro, Observacoes, Categoria };
            const livro = await LivrosModel.criar(livroData);
    
            res.status(201).json({
                message: 'Livro inserido com sucesso.',
                data: livro.toJSON(),
            });
        } catch (error) {
            console.error('Erro ao inserir livro:', error);
            res.status(500).json({ message: 'Erro ao inserir livro.', error: error.message });
        }
    }


    //Método buscar livro por filtro 
        async buscarPorFiltro(req, res){
            try {
                const { termo } = req.query;                
                const livros = await LivrosModel.buscarPorFiltro(termo);
                if(livros.length === 0){    
                    return res.status(404).json({
                        message: 'Nenhum livro encontrado.'
                    });
                }       
                res.status(200).json({
                    message: 'Livros encontrados.',
                    data: livros.map(livro => livro.toJSON())
                });        
            } catch (error) {
                console.error('Erro ao buscar livros por filtro:', error);
                res.status(500).json({
                    message: 'Erro ao buscar livros por filtro.',
                    error: error.message
                });
            }
        }


        //Método buscar livro por id
        async buscarPorId(req, res) {
            try {
                const { id } = req.params;
                const livro = await LivrosModel.buscarPorId(id);
        
                if (!livro) { // Verifica se o livro foi encontrado
                    return res.status(404).json({
                        message: 'Livro não encontrado.'
                    });
                }
        
                res.status(200).json({
                    message: 'Livro encontrado.',
                    data: livro.toJSON() // Converte os dados do modelo para JSON
                });
            } catch (error) {
                console.error('Erro ao buscar livro por ID:', error);
                res.status(500).json({
                    message: 'Erro ao buscar livro por ID.',
                    error: error.message
                });
            }
        }
        

        //Método excluir livro por id
        async deletar(req, res){    
            try {                
                const { id } = req.params;
                const livro = await LivrosModel.buscarPorId(id);
                if(!livro){
                    return res.status(404).json({
                        message: 'Livro nao encontrado.'
                    });
                }
                await livro.deletar();
                res.status(200).json({
                    message: 'Livro excluido com sucesso.',
                    data: livro.toJSON()
                });
            } catch (error) {
                console.error('Erro ao excluir livro:', error);
                res.status(500).json({
                    message: 'Erro ao excluir livro.',
                    error: error.message
                });
            }    
        }       


        //Método atualizar livro por id
        async atualizar(req, res){
            try {
                const { id } = req.params;
                const { Titulo, Autor, Editora, Ano, ISBN, NumeroDePaginas, Genero, Estado, Tombo, DataDeCadastro, Observacoes, Categoria} = req.body;
                const livroData = { Titulo, Autor, Editora, Ano, ISBN, NumeroDePaginas, Genero, Estado, Tombo, DataDeCadastro, Observacoes, Categoria};
                const livro = await LivrosModel.buscarPorId(id);
                if(!livro){
                    return res.status(404).json({
                        message: 'Livro nao encontrado.'
                    });
                }
                await livro.atualizar(livroData);
                res.status(200).json({
                    message: 'Livro atualizado com sucesso.',
                    data: livro.toJSON()
                });
            } catch (error) {
                console.error('Erro ao atualizar livro:', error);
                res.status(500).json({
                    message: 'Erro ao atualizar livro.',
                    error: error.message
                });
            }
        }
    }

module.exports = new  LivrosController(); 