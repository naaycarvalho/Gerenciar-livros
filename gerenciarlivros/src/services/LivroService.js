const API_BASE_URL = 'http://localhost:3000'
class LivroService {

    async obterTodosLivros() {
        const response = await fetch(`${API_BASE_URL}/livro`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('Erro ao obter todos os livros.', response.status, response.statusText);
            return [];
        }

        const dados = await response.json();
        return dados;
    }

    async obterLivroPorId(id) {
        const response = await fetch(`${API_BASE_URL}/livro/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Erro ao obter livro com id: ${id}.`, response.status, response.statusText);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async cadastrarLivro(livro) {
        console.log("Dados do livro:", livro);  // Log para depuração

        const response = await fetch(`${API_BASE_URL}/livro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livro)
        });

        if (!response.ok) {
            console.error('Erro ao cadastrar livro.', response.status, response.statusText);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async atualizarLivro(id, livroAtualizado) {
        const response = await fetch(`${API_BASE_URL}/livro/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroAtualizado)
        });

        if (!response.ok) {
            console.error(`Erro ao atualizar livro com id: ${id}.`, response.status, response.statusText);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async deletarLivro(id) {
        const response = await fetch(`${API_BASE_URL}/livro/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Erro ao deletar livro com id: ${id}.`, response.status, response.statusText);
            return false;
        }

        return true;
    }
}

export default LivroService;
