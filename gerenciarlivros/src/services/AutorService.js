import { fetchWithAuth } from '../api/api';

class AutorService {
    
    async obterTodosAutores() {
        try {
            const dados = await fetchWithAuth('/autor');
            return dados;
        } catch (error) {
            console.error('Erro ao obter todos os autores.', error.message);
            return [];
        }
    }

    async obterAutorPorId(id) {
        try {
            const dados = await fetchWithAuth(`/autor/${id}`);
            return dados;
        } catch (error) {
            console.error(`Erro ao obter autor com id: ${id}.`, error.message);
            return null;
        }
    }

    async cadastrarAutor(autor) {
        console.log("Dados do autor:", autor);  // Log para depuração
        try {
            const dados = await fetchWithAuth('/autor', {
                method: 'POST',
                body: JSON.stringify(autor)
            });
            return dados;
        } catch (error) {
            console.error('Erro ao cadastrar autor.', error.message);
            return null;
        }
    }

    async atualizarAutor(id, autorAtualizado) {
        try {
            const dados = await fetchWithAuth(`/autor/${id}`, {
                method: 'PUT',
                body: JSON.stringify(autorAtualizado)
            });
            return dados;
        } catch (error) {
            console.error(`Erro ao atualizar autor com id: ${id}.`, error.message);
            return null;
        }
    }

    async deletarAutor(id) {
        try {
            await fetchWithAuth(`/autor/${id}`, {
                method: 'DELETE'
            });
            return true;
        } catch (error) {
            console.error(`Erro ao deletar autor com id: ${id}.`, error.message);
            return false;
        }
    }
}

export default AutorService;
