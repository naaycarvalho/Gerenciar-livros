const API_BASE_URL = 'http://localhost:3000'
class AutorService {

    async obterTodosAutores() {
        const response = await fetch(`${API_BASE_URL}/autor`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('Erro ao obter todos os autores.', response.status, response.statusText);
            return [];
        }

        const dados = await response.json();
        return dados;
    }

    async obterAutorPorId(id) {
        const response = await fetch(`${API_BASE_URL}/autor/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Erro ao obter autor com id: ${id}.`, response.status, response.statusText);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async cadastrarAutor(Autor) {
        console.log("Dados do livro:", Autor);  // Log para depuração

        const response = await fetch(`${API_BASE_URL}/autor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Autor)
        });

        if (!response.ok) {
            console.error('Erro ao cadastrar autor.', response.status, response.statusText);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async atualizarAutor(id, autoresAtualizados) {
        const response = await fetch(`${API_BASE_URL}/livro/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(autoresAtualizados)
        });

        if (!response.ok) {
            console.error(`Erro ao atualizar autor com id: ${id}.`, response.status, response.statusText);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async deletarAutor(id) {
        const response = await fetch(`${API_BASE_URL}/autor/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Erro ao deletar autor com id: ${id}.`, response.status, response.statusText);
            return false;
        }

        return true;
    }
}

export default AutorService;