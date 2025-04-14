import { fetchWithAuth } from '../api/api'; // ajuste o caminho se necessário

class EmprestimoService {

    async obterEmprestimos(termo) {
        try {
            const dados = await fetchWithAuth(`/emprestimo?termo=${termo}`);
            return dados;
        } catch (error) {
            console.error('Erro ao obter todos os empréstimos.', error.message);
            return [];
        }
    }

    async obterEmprestimosPorId(id) {
        try {
            const dados = await fetchWithAuth(`/emprestimo/${id}`);
            return dados;
        } catch (error) {
            console.error(`Erro ao obter o empréstimo com id: ${id}.`, error.message);
            return null;
        }
    }

    async cadastrarEmprestimo(emprestimo) {
        console.log("Dados do empréstimo:", emprestimo);
        try {
            const dados = await fetchWithAuth(`/emprestimo`, {
                method: 'POST',
                body: JSON.stringify(emprestimo)
            });
            return dados;
        } catch (error) {
            console.error('Erro ao cadastrar empréstimo.', error.message);
            return null;
        }
    }

    async atualizarEmprestimo(id, emprestimoAtualizado) {
        try {
            const dados = await fetchWithAuth(`/emprestimo/${id}`, {
                method: 'PUT',
                body: JSON.stringify(emprestimoAtualizado)
            });
            return dados;
        } catch (error) {
            console.error(`Erro ao atualizar o empréstimo com id: ${id}.`, error.message);
            return null;
        }
    }

    async excluirEmprestimo(id) {
        try {
            await fetchWithAuth(`/emprestimo/${id}`, {
                method: 'DELETE'
            });
            return true;
        } catch (error) {
            console.error(`Erro ao excluir o empréstimo com id: ${id}.`, error.message);
            return false;
        }
    }
}

export default new EmprestimoService();
