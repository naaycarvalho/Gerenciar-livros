import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import InputMask from 'react-input-mask';

function FornecedorForm() {
  const [fornecedor, setFornecedor] = useState({
    razaoSocial: '',
    cnpj: '',
    representante: '',
    telefone: '',
    email: '',
    endereco: '',
    banco: '',
    agencia: '',
    conta: ''
  });

  const [fornecedores, setFornecedores] = useState([]);

  // Carregar os fornecedores armazenados no localStorage
  useEffect(() => {
    const storedFornecedores = JSON.parse(localStorage.getItem('Fornecedor')) || [];
    setFornecedores(storedFornecedores);
  }, []);

  // Atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFornecedor((prevFornecedor) => ({
      ...prevFornecedor,
      [name]: value
    }));
  };

  // Enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Atualizar a lista de fornecedores
    const updatedFornecedores = [...fornecedores, fornecedor];
    setFornecedores(updatedFornecedores);

    // Armazenar no localStorage
    localStorage.setItem('Fornecedor', JSON.stringify(updatedFornecedores));

    // Limpar o formulário
    setFornecedor({
      razaoSocial: '',
      cnpj: '',
      representante: '',
      telefone: '',
      email: '',
      endereco: '',
      banco: '',
      agencia: '',
      conta: ''
    });
  };

  const handleDelete = (index) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este fornecedor?");
    if (confirmar) {
      const fornecedoresAtualizados = [...fornecedores];
      fornecedoresAtualizados.splice(index, 1);
      setFornecedores(fornecedoresAtualizados);
      localStorage.setItem('Fornecedor', JSON.stringify(fornecedoresAtualizados));
    }
  };

  return (
    <>
      <h2>Cadastro de Fornecedores</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formRazaoSocial">
              <Form.Label>Razão Social</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a Razão Social"
                name="razaoSocial"
                value={fornecedor.razaoSocial}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCNPJ">
              <Form.Label>CNPJ</Form.Label>
              <InputMask
                mask="99.999.999/9999-99"
                placeholder="Digite o CNPJ"
                name="cnpj"
                value={fornecedor.cnpj}
                onChange={handleChange}
                className="form-control"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Outros campos do formulário... */}

        <Button variant="primary" type="submit">
          Adicionar
        </Button>
      </Form>

      {/* Lista de Fornecedores */}
      <h3>Lista de Fornecedores</h3>
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

export default FornecedorForm;