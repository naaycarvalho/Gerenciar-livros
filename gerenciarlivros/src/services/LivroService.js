
import { fetchWithAuth } from '../api/api';

class LivroService {

    async obterTodosLivros() {
        try {
            const dados = await fetchWithAuth('/livro');
            return dados;
        } catch (error) {
            console.error('Erro ao obter todos os livros.', error.message);
            return [];
        }
    }

    async obterLivroPorId(id) {
        try {
            const dados = await fetchWithAuth(`/livro/${id}`);
            return dados;
        } catch (error) {
            console.error(`Erro ao obter livro com id: ${id}.`, error.message);
            return null;
        }
    }

    async cadastrarLivro(livro) {
        console.log("Dados do livro:", livro);
        try {
            const dados = await fetchWithAuth('/livro', {
                method: 'POST',
                body: JSON.stringify(livro)
            });
            return dados;
        } catch (error) {
            console.error('Erro ao cadastrar livro.', error.message);
            return null;
        }
    }

    async atualizarLivro(id, livroAtualizado) {
        try {
            const dados = await fetchWithAuth(`/livro/${id}`, {
                method: 'PUT',
                body: JSON.stringify(livroAtualizado)
            });
            return dados;
        } catch (error) {
            console.error(`Erro ao atualizar livro com id: ${id}.`, error.message);
            return null;
        }
    }

    async deletarLivro(id) {
        try {
            await fetchWithAuth(`/livro/${id}`, {
                method: 'DELETE'
            });
            return true;
        } catch (error) {
            console.error(`Erro ao deletar livro com id: ${id}.`, error.message);
            return false;
        }
    }
}

export default LivroService;
