const MotivoBaixaModel = require('../model/MotivosBaixaModel.js');

class MotivoBaixaController {

    // Método para criar um motivo de baixa
    async inserir(req, res) {
        try {
            const { motivo, data } = req.body;

            if (!motivo || !data) {
                return res.status(400).json({
                    message: 'Motivo e data são obrigatórios.'
                });
            }

            const motivoBaixaData = { motivo, data };
            const motivoBaixa = await MotivoBaixaModel.criar(motivoBaixaData);

            res.status(201).json({
                message: 'Motivo de baixa criado com sucesso.',
                data: motivoBaixa.toJSON()
            });
        } catch (error) {
            console.error('Erro ao inserir motivo de baixa:', error);
            res.status(500).json({
                message: 'Erro ao inserir motivo de baixa.',
                error: error.message
            });
        }
    }

    // Método para buscar motivos de baixa por filtro
    async buscarPorFiltro(req, res) {
        try {
            const { termo } = req.query;
            const motivos = await MotivoBaixaModel.buscaPorFiltro(termo);

            if (motivos.length === 0) {
                return res.status(404).json({
                    message: 'Nenhum motivo de baixa encontrado.'
                });
            }

            res.status(200).json({
                message: 'Motivos de baixa encontrados.',
                data: motivos.map(motivo => motivo.toJSON())
            });
        } catch (error) {
            console.error('Erro ao buscar motivos de baixa por filtro:', error);
            res.status(500).json({
                message: 'Erro ao buscar motivos de baixa por filtro.',
                error: error.message
            });
        }
    }

    // Método para buscar motivo de baixa por ID
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const motivoBaixa = await MotivoBaixaModel.buscarPorId(id);

            if (!motivoBaixa) {
                return res.status(404).json({
                    message: 'Motivo de baixa não encontrado.'
                });
            }

            res.status(200).json({
                message: 'Motivo de baixa encontrado.',
                data: motivoBaixa.toJSON()
            });
        } catch (error) {
            console.error('Erro ao buscar motivo de baixa por ID:', error);
            res.status(500).json({
                message: 'Erro ao buscar motivo de baixa por ID.',
                error: error.message
            });
        }
    }

    // Método para deletar motivo de baixa por ID
    async deletar(req, res) {
        try {
            const { id } = req.params;
            const motivoBaixa = await MotivoBaixaModel.buscarPorId(id);

            if (!motivoBaixa) {
                return res.status(404).json({
                    message: 'Motivo de baixa não encontrado.'
                });
            }

            await motivoBaixa.deletar();

            res.status(200).json({
                message: 'Motivo de baixa excluído com sucesso.',
                data: motivoBaixa.toJSON()
            });
        } catch (error) {
            console.error('Erro ao excluir motivo de baixa:', error);
            res.status(500).json({
                message: 'Erro ao excluir motivo de baixa.',
                error: error.message
            });
        }
    }

    // Método para atualizar motivo de baixa por ID
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { motivo, data } = req.body;

            const motivoBaixa = await MotivoBaixaModel.buscarPorId(id);

            if (!motivoBaixa) {
                return res.status(404).json({
                    message: 'Motivo de baixa não encontrado.'
                });
            }

            if (!motivo || !data) {
                return res.status(400).json({
                    message: 'Motivo e data são obrigatórios para atualização.'
                });
            }

            motivoBaixa.motivo = motivo;
            motivoBaixa.data = data;

            await motivoBaixa.atualizar();

            res.status(200).json({
                message: 'Motivo de baixa atualizado com sucesso.',
                data: motivoBaixa.toJSON()
            });
        } catch (error) {
            console.error('Erro ao atualizar motivo de baixa:', error);
            res.status(500).json({
                message: 'Erro ao atualizar motivo de baixa.',
                error: error.message
            });
        }
    }
}

module.exports = new MotivoBaixaController();
