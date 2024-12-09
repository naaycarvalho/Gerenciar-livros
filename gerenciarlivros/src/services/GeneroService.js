const API_BASE_URL = 'http://localhost:3000'

class GeneroService {

    async obterGeneros(termo) {
        const response = await fetch(`${API_BASE_URL}/genero?termo=${termo}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            console.log('Erro ao obter todos os gêneros.');
            return [];
        }

        const dados = await response.json();
        return dados;
    }

    async obterGeneroPorId(id) {
        const response = await fetch(`${API_BASE_URL}/genero/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log(`Erro ao obter o gênero com id: ${id}.`);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async cadastrarGenero(genero) {
        const response = await fetch(`${API_BASE_URL}/genero`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(genero)
        });

        if (!response.ok) {
            console.log('Erro ao cadastrar o gênero.');
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async atualizarGenero(id, generoAtualizado) {
        const response = await fetch(`${API_BASE_URL}/genero/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(generoAtualizado)
        });

        if (!response.ok) {
            console.log(`Erro ao atualizar o gênero com id: ${id}.`);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async deletarGenero(id) {
        const response = await fetch(`${API_BASE_URL}/genero/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log(`Erro ao deletar o gênero com id: ${id}.`);
            return false;
        }

        return true;
    }
}

export default GeneroService;