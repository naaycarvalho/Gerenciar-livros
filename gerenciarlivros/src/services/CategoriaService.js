const API_BASE_URL = 'http://localhost:3000'

class CategoriaService {

    async obterCategorias(termo) {
        const response = await fetch(`${API_BASE_URL}/categoria?termo=${termo}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            console.log('Erro ao obter todas categoria.');
            return [];
        }

        const dados = await response.json();
        return dados;
    }

    async obterCategoriaPorId(id) {
        const response = await fetch(`${API_BASE_URL}/categoria/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log(`Erro ao obter categoria com id: ${id}.`);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async cadastrarCategoria(categoria) {
        const response = await fetch(`${API_BASE_URL}/categoria`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });

        if (!response.ok) {
            console.log('Erro ao cadastrar o categoria.');
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async atualizarCategoria(id, categoriaAtualizado) {
        const response = await fetch(`${API_BASE_URL}/categoria/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoriaAtualizado)
        });

        if (!response.ok) {
            console.log(`Erro ao atualizar o categoria com id: ${id}.`);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async deletarCategoria(id) {
        const response = await fetch(`${API_BASE_URL}/categoria/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log(`Erro ao deletar o categoria com id: ${id}.`);
            return false;
        }

        return true;
    }
}

export default CategoriaService;