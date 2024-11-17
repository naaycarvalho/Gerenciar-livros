import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

function FornecedorList() {
  const [fornecedor, setFornecedor] = useState([]);

  useEffect(() => {
    const storedFornecedor = JSON.parse(localStorage.getItem('Fornecedor')) || [];
    setFornecedor(storedFornecedor);
  }, []);

  const handleDelete = (index) => {

    const confirmar = window.confirm("Tem certeza que deseja excluir este fornecedor?");
    if (confirmar) {
      const fornecedoresAtualizados = [...fornecedor];
      fornecedoresAtualizados.splice(index, 1);


      setFornecedor(fornecedoresAtualizados);
      localStorage.setItem('Fornecedor', JSON.stringify(fornecedoresAtualizados));
    }
  };

  return (
    <>
      <h2>Lista de Fornecedores</h2>
      {fornecedor.length === 0 ? (
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
            {fornecedor.map((item, index) => (
              <tr key={index}>
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
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(index)}
                  >
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
}

export default FornecedorList;