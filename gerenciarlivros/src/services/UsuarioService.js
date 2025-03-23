const API_BASE_URL = 'http://localhost:3000'

class UsuarioService {

    async obterUsuarios() {
        const response = await fetch(`${API_BASE_URL}/usuario`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            console.log('Erro ao obter todos os usuários.');
            return [];
        }

        const dados = await response.json();
        return dados;
    }

    async obterUsuarioPorId(id) {
        const response = await fetch(`${API_BASE_URL}/usuario/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log(`Erro ao obter o usuário com id: ${id}.`);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async cadastrarUsuario(usuario) {
        const response = await fetch(`${API_BASE_URL}/usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            console.log('Erro ao cadastrar o usuário.');
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async atualizarUsuario(id, usuarioAtualizado) {
        const response = await fetch(`${API_BASE_URL}/usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioAtualizado)
        });

        if (!response.ok) {
            console.log(`Erro ao atualizar o usuário com id: ${id}.`);
            return null;
        }

        const dados = await response.json();
        return dados;
    }

    async deletarUsuario(id) {
        const response = await fetch(`${API_BASE_URL}/usuario/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log(`Erro ao deletar o usuário com id: ${id}.`);
            return false;
        }

        return true;
    }
}

export default UsuarioService;