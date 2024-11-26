const FornecedorModel = require('../model/FornecedorModel.js');

class FornecedorController {

    //Método para criar o fornecedor
    async inserir(req, res){
        try {
            const {razaoSocial, cnpj, representante, telefone, email, endereco, banco, agencia, conta} = req.body;

            const fornecedorData = {razaoSocial, cnpj, representante, telefone, email, endereco, banco, agencia, conta};
            const fornecedor = await FornecedorModel.criar(fornecedorData);

            res.status(201).json({
                message: 'Fornecedor criado com sucesso.',
                data: fornecedor.toJSON()
            });
        } catch (error) {
            console.error('Erro ao inserir fornecedor:', error);
            res.status(500).json({
                message: 'Erro ao inserir fornecedor.',
                error: error.message
            });
        }
    }

    //Método buscar fornecedor por filtro
    async buscarPorFiltro(req, res){
        try {
            const { termo } = req.query;
            const fornecedores = await FornecedorModel.buscaPorFiltro(termo);
            if(fornecedores.length === 0){
                return res.status(404).json({
                    message: 'Nenhum fornecedor encontrado.'
                });
            }
            res.status(200).json({
                message: 'Fornecedores encontrados.',
                data: fornecedores.map(fornecedor => fornecedor.toJSON())
            });
        } catch (error) {
            console.error('Erro ao buscar fornecedores por filtro:', error);
            res.status(500).json({
                message: 'Erro ao buscar fornecedores por filtro.',
                error: error.message
            });
        }
    }

    //Método buscar fornecedor por id
    async buscarPorId(req, res){
        try {
            const { id } = req.params;
            const fornecedor = await FornecedorModel.buscarPorId(id);

            if(!fornecedor){
                return res.status(404).json({
                    message: 'Fornecedor não encontrado.'
                });
            }
            res.status(200).json({
                message: 'Fornecedor encontrado.',
                data: fornecedor.toJSON()
            });
        } catch (error) {
            console.error('Erro ao buscar fornecedor por id:', error);
            res.status(500).json({
                message: 'Erro ao buscar fornecedor por id.',
                error: error.message
            });
        }
    }

    //Método excluir fornecedor por id
    async deletar(req, res){
        try {
            const { id } = req.params;
            const fornecedor = await FornecedorModel.buscarPorId(id);

            if(!fornecedor){
                return res.status(404).json({
                    message: 'Fornecedor não encontrado.'
                });
            }

            await fornecedor.deletar();

            res.status(200).json({
                message: 'Fornecedor excluido com sucesso.',
                data: usuario.toJSON()
            });
        } catch (error) {
            console.error('Erro ao excluir fornecedor:', error);
            res.status(500).json({
                message: 'Erro ao excluir fornecedor.',
                error: error.message
            });
        }
    }

    //Método atualizar fornecedor por id
    async atualizar(req, res){
        try {
            const { id } = req.params;
            const {razaoSocial, cnpj, representante, telefone, email, endereco, banco, agencia, conta} = req.body;

            const fornecedor = await FornecedorModel.buscarPorId(id);

            if(!fornecedor){
                return res.status(404).json({
                    message: 'Fornecedor não encontrado.'
                });
            }

            fornecedor.razaoSocial = razaoSocial;
            fornecedor.cnpj = cnpj;
            fornecedor.representante = representante;
            fornecedor.telefone = telefone;
            fornecedor.email = email;
            fornecedor.endereco = endereco;
            fornecedor.banco = banco;
            fornecedor.agencia = agencia;
            fornecedor.conta = conta;

            await fornecedor.atualizar();

            res.status(200).json({
                message: 'Fornecedor atualizado com sucesso.',
                data: usuario.toJSON()
            });
        } catch (error) {
            console.error('Erro ao atualizar fornecedor:', error);
            res.status(500).json({
                message: 'Erro ao atualizar fornecedor.',
                error: error.message
            });
        }
    }
}

module.exports = new FornecedorController();