const API_BASE_URL = 'http://localhost:3000';

class MotivoBaixaService {
  async obterTodosMotivos() {
    const response = await fetch(`${API_BASE_URL}/motivos-baixa`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Erro ao obter todos os motivos de baixa.');
      return [];
    }

    const dados = await response.json();
    return dados;
  }

  async obterMotivoPorId(id) {
    const response = await fetch(`${API_BASE_URL}/motivos-baixa/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Erro ao obter o motivo de baixa com id: ${id}.`);
      return null;
    }

    const dados = await response.json();
    return dados;
  }

  async cadastrarMotivo(motivo) {
    const response = await fetch(`${API_BASE_URL}/motivos-baixa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(motivo),
    });

    if (!response.ok) {
      console.error('Erro ao cadastrar o motivo de baixa.');
      return null;
    }

    const dados = await response.json();
    return dados;
  }

  async atualizarMotivo(id, motivoAtualizado) {
    const response = await fetch(`${API_BASE_URL}/motivos-baixa/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(motivoAtualizado),
    });

    if (!response.ok) {
      console.error(`Erro ao atualizar o motivo de baixa com id: ${id}.`);
      return null;
    }

    const dados = await response.json();
    return dados;
  }

  async deletarMotivo(id) {
    const response = await fetch(`${API_BASE_URL}/motivos-baixa/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Erro ao deletar o motivo de baixa com id: ${id}.`);
      return false;
    }

    return true;
  }
}

export default MotivoBaixaService;
