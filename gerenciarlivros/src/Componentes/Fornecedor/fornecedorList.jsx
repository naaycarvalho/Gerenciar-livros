import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import FornecedorService from "../../services/FornecedorService";

const fornecedorService = new FornecedorService();

const FornecedorList = () => {
  // Definindo o estado para armazenar os fornecedores
  const [fornecedores, setFornecedores] = useState([]);

  // Obtendo os fornecedores ao montar o componente
  useEffect(() => {
    fornecedorService
      .obterTodosFornecedores()
      .then((response) => {
        setFornecedores(response.data); // Atualiza a lista de fornecedores
      })
      .catch((erro) => {
        console.error("Erro ao buscar os fornecedores:", erro);
      });
  }, []); // A dependência vazia faz com que esse efeito só seja chamado uma vez, ao montar o componente

  // Função para excluir um fornecedor
  const handleDelete = (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este fornecedor?");
    if (confirmar) {
      fornecedorService
        .deletarFornecedor(id) // Fazendo a requisição para o backend
        .then(() => {
          // Atualizando o estado local após a exclusão
          const fornecedoresAtualizados = fornecedores.filter((fornecedor) => fornecedor.id !== id);
          setFornecedores(fornecedoresAtualizados);
        })
        .catch((erro) => {
          console.error("Erro ao excluir fornecedor:", erro);
        });
    }
  };

  return (
    <>
      <h2>Lista de Fornecedores</h2>
      {fornecedores.length === 0 ? (
        <p>Nenhum fornecedor cadastrado.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Razão Social</th>
              <th>CNPJ</th>
              <th>Representante</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Endereço</th>
              <th>Banco</th>
              <th>Agência</th>
              <th>Conta</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((item, index) => (
              <tr key={item.id}> {/* Usar 'id' para chave única, não o índice */}
                <td>{index + 1}</td>
                <td>{item.razaoSocial}</td>
                <td>{item.cnpj}</td>
                <td>{item.representante}</td>
                <td>{item.telefone}</td>
                <td>{item.email}</td>
                <td>{item.endereco}</td>
                <td>{item.banco}</td>
                <td>{item.agencia}</td>
                <td>{item.conta}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(item.id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default FornecedorList;
