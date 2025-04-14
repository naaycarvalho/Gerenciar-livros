import { fetchWithAuth } from '../api/api';

class CategoriaService {

    async carregarCategorias() {
        try {
            const dados = await fetchWithAuth('/categoria');
            return dados;
        } catch (error) {
            console.error('Erro ao obter todas as categorias.', error.message);
            return [];
        }
    }

    async obterCategorias(termo) {
        try {
            const dados = await fetchWithAuth(`/categoria?termo=${encodeURIComponent(termo)}`);
            return dados;
        } catch (error) {
            console.error('Erro ao obter categorias por termo.', error.message);
            return [];
        }
    }

    async obterCategoriaPorId(id) {
        try {
            const dados = await fetchWithAuth(`/categoria/${id}`);
            return dados;
        } catch (error) {
            console.error(`Erro ao obter categoria com id: ${id}.`, error.message);
            return null;
        }
    }

    async cadastrarCategoria(categoria) {
        try {
            const dados = await fetchWithAuth('/categoria', {
                method: 'POST',
                body: JSON.stringify(categoria)
            });
            return dados;
        } catch (error) {
            console.error('Erro ao cadastrar a categoria.', error.message);
            return null;
        }
    }

    async atualizarCategoria(id, categoriaAtualizado) {
        try {
            const dados = await fetchWithAuth(`/categoria/${id}`, {
                method: 'PUT',
                body: JSON.stringify(categoriaAtualizado)
            });
            return dados;
        } catch (error) {
            console.error(`Erro ao atualizar a categoria com id: ${id}.`, error.message);
            return null;
        }
    }

    async deletarCategoria(id) {
        try {
            await fetchWithAuth(`/categoria/${id}`, {
                method: 'DELETE'
            });
            return true;
        } catch (error) {
            console.error(`Erro ao deletar a categoria com id: ${id}.`, error.message);
            return false;
        }
    }
}

export default CategoriaService;
