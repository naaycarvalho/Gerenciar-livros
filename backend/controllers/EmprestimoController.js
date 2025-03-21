const Emprestimo = require('../model/Emprestimo.Model');
const Livro = require('../model/LivrosModel');
const Usuario = require('../model/UsuarioModel');


class EmprestimoController {    

    async gravar(req, res) {
        try {
            const { idLivro, idUsuario, dataEmprestimo, dataDevolucao, status } = req.body;

            const livro = await Livro.buscarPorId(idLivro);
            if (!livro) {
                return res.status(404).json({ message: 'Livro não encontrado.' });
            }

            const usuario = await Usuario.buscarPorId(idUsuario);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            const emprestimoData = {
                idLivro: livro.id,
                idUsuario: usuario.id,
                dataEmprestimo,
                dataDevolucao,
                status
            };

            const emprestimo = await Emprestimo.gravar(emprestimoData);

            res.status(201).json({
                message: 'Empréstimo criado com sucesso.',
                data: emprestimo
            });
        } catch (error) {
            console.error('Erro ao gravar empréstimo:', error);
            res.status(500).json({
                message: 'Erro ao gravar empréstimo.',
                error: error.message
            });
        }
    }

    async atualizar(req, res) {
        try {
            const { idEmprestimo } = req.params;
            const { idLivro, idUsuario, dataRetirada, dataDevolucao, status } = req.body;

            if (!idEmprestimo) {
                return res.status(400).json({ message: 'ID do empréstimo é obrigatório.' });
            }

            const emprestimo = await Emprestimo.buscarPorId(idEmprestimo);
            if (!emprestimo) {
                return res.status(404).json({ message: 'Empréstimo não encontrado.' });
            }

            emprestimo.idLivro = idLivro || emprestimo.idLivro;
            emprestimo.idUsuario = idUsuario || emprestimo.idUsuario;
            emprestimo.dataRetirada = dataRetirada || emprestimo.dataRetirada;
            emprestimo.dataDevolucao = dataDevolucao || emprestimo.dataDevolucao;
            emprestimo.status = status || emprestimo.status;

            await emprestimo.atualizar();
            res.status(200).json({ message: 'Empréstimo atualizado com sucesso.', data: emprestimo.toJSON() });
        } catch (error) {
            console.error('Erro ao atualizar empréstimo:', error);
            res.status(500).json({ message: 'Erro ao atualizar empréstimo.', error: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const { idEmprestimo } = req.params
            const emprestimo = await Emprestimo.buscarPorId(idEmprestimo);
            if (!emprestimo) {
                return res.status(404).json({ message: 'Empréstimo não encontrado.' });
            }
            await emprestimo.deletar();
            res.status(200).json({
                 message: 'Empréstimo excluído com sucesso.',
                 data: { idEmprestimo } });
        } catch (error) {
            console.error('Erro ao excluir empréstimo:', error);
            res.status(500).json({ message: 'Erro ao excluir empréstimo.', error: error.message });
        }
    }
    

    
    
    async buscarEmprestimos(req, res) {
        try {
            const emprestimos = await Emprestimo.buscarTodos();
            res.status(200).json(emprestimos);
        } catch (error) {
            console.error('Erro ao buscar emprestimos:', error);
            res.status(500).json({
                message: 'Erro ao buscar emprestimos.',
                error: error.message
            });
        }
    }

    async buscarEmprestimosPorId(req, res) {
        try {
            const { idEmprestimo } = req.params;
            const emprestimo = await Emprestimo.buscarPorId(idEmprestimo);
            if (!emprestimo) {
                return res.status(404).json({
                    message: 'Emprestimo nao encontrado.'
                });
            }
            res.status(200).json(emprestimo);
        } catch (error) {
            console.error('Erro ao buscar emprestimos por id:', error);
            res.status(500).json({
                message: 'Erro ao buscar emprestimos por id.',
                error: error.message
            });
        }
    }
}

module.exports = new EmprestimoController();