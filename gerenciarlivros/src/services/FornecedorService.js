const API_BASE_URL = 'http://localhost:3000'

class FornecedorService {

    async obterTodosFornecedores() {
        const response = await fetch(`${API_BASE_URL}/fornecedor/fornecedores`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            console.log('Erro ao obter todos os fornecedores.');
            return [];
        }

        const dados = await response.json();
        return dados;
    }

    async obterFornecedorPorId(id) {
        const response = await fetch(`${API_BASE_URL}/fornecedor/fornecedores/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log(`Erro ao obter o fornecedor com id: ${id}.`);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async cadastrarFornecedor(fornecedor) {
        const response = await fetch(`${API_BASE_URL}/fornecedor/fornecedores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fornecedor)
        });

        if (!response.ok) {
            console.log('Erro ao cadastrar o fornecedor.');
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async atualizarFornecedor(id, fornecedorAtualizado) {
        const response = await fetch(`${API_BASE_URL}/fornecedor/fornecedores/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fornecedorAtualizado)
        });

        if (!response.ok) {
            console.log(`Erro ao atualizar o fornecedor com id: ${id}.`);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async deletarFornecedor(id) {
        const response = await fetch(`${API_BASE_URL}/fornecedor/fornecedores/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log(`Erro ao deletar o fornecedor com id: ${id}.`);
            return false;
        }

        return true;
    }
}

export default FornecedorService;