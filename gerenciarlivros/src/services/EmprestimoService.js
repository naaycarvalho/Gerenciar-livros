const API_BASE_URL = 'http://localhost:3000'

class EmprestimoService {
    
    async obterEmprestimos(termo) {
        const response = await fetch(`${API_BASE_URL}/emprestimos?termo=${termo}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log('Erro ao obter todos os empréstimos.');
            return [];
        }

        const dados = await response.json();
        return dados;
    }

    async obterEmprestimosPorId(id) {
        const response = await fetch(`${API_BASE_URL}/emprestimos/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log(`Erro ao obter o empréstimo com id: ${id}.`);
            return null;
        }
            const dados = await response.json();
            return dados;
        }

        async cadastrarEmprestimo(Emprestimo) {
            console.log("Dados do empréstimo:", Emprestimo);  // Log para depuração
            const response = await fetch(`${API_BASE_URL}/emprestimos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Emprestimo)
            });
            if (!response.ok) {
                console.error('Erro ao cadastrar empréstimo.', response.status, response.statusText);
                return null;
            }
            const dados = await response.json();
            return dados;
        }

        async atualizarEmprestimo(id, EmprestimoAtualizado) {
            const response = await fetch(`${API_BASE_URL}/emprestimos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(EmprestimoAtualizado)
            });
            if (!response.ok) {
                console.log(`Erro ao atualizar o empréstimo com id: ${id}.`);
                return null;
            }
            const dados = await response.json();
            return dados;
        }

        async excluirEmprestimo(id) {
            const response = await fetch(`${API_BASE_URL}/emprestimos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.log(`Erro ao excluir o empréstimo com id: ${id}.`);
                return false;
            }
            return true;
        }
    }
     export default new EmprestimoService();
    

