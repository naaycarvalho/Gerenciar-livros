import { fetchWithAuth } from '../api/api';

class GeneroService {
    async carregarGeneros() {
        try {
            const dados = await fetchWithAuth('/genero');
            return dados;
        } catch (error) {
            console.log('Erro ao obter todos os gêneros.', error.message);
            return [];
        }
    }

    async obterGeneros(termo) {
        try {
            const dados = await fetchWithAuth(`/genero?termo=${termo}`);
            return dados;
        } catch (error) {
            console.log('Erro ao obter gêneros com termo.', error.message);
            return [];
        }
    }

    async obterGeneroPorId(id) {
        try {
            const dados = await fetchWithAuth(`/genero/${id}`);
            return dados;
        } catch (error) {
            console.log(`Erro ao obter o gênero com id: ${id}.`, error.message);
            return null;
        }
    }

    async cadastrarGenero(genero) {
        try {
            const dados = await fetchWithAuth('/genero', {
                method: 'POST',
                body: JSON.stringify(genero)
            });
            return dados;
        } catch (error) {
            console.log('Erro ao cadastrar o gênero.', error.message);
            return null;
        }
    }

    async atualizarGenero(id, generoAtualizado) {
        try {
            const dados = await fetchWithAuth(`/genero/${id}`, {
                method: 'PUT',
                body: JSON.stringify(generoAtualizado)
            });
            return dados;
        } catch (error) {
            console.log(`Erro ao atualizar o gênero com id: ${id}.`, error.message);
            return null;
        }
    }

    async deletarGenero(id) {
        try {
            await fetchWithAuth(`/genero/${id}`, {
                method: 'DELETE'
            });
            return true;
        } catch (error) {
            console.log(`Erro ao deletar o gênero com id: ${id}.`, error.message);
            return false;
        }
    }
}

export default GeneroService;
