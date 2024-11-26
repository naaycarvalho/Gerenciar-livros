const API_BASE_URL = 'http://localhost:3000'

class LivroService {

    async obterTodosLivros() {
        const response = await fetch(`${API_BASE_URL}/livro`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            console.log('Erro ao obter todos os livros.');
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
            console.log(`Erro ao obter livro com id: ${id}.`);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async cadastrarLivro(livro) {
        const response = await fetch(`${API_BASE_URL}/livro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livro)
        });

        if (!response.ok) {
            console.log('Erro ao cadastrar livro.');
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
            console.log(`Erro ao atualizar livro com id: ${id}.`);
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
            console.log(`Erro ao deletar livro com id: ${id}.`);
            return false;
        }

        return true;
    }
}

export default LivroService;