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
  const [validated, setValidated] = useState(false);

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
    const form = e.currentTarget;

    // Verificar se o formulário é válido
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

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
    setValidated(false);
  };

  // Excluir fornecedor
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
      <h2>Cadastro de Fornecedores</h2> <br /> <br />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formRazaoSocial">
              <Form.Label>Razão Social</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Digite a Razão Social"
                name="razaoSocial"
                value={fornecedor.razaoSocial}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Razão Social é obrigatória.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCNPJ">
              <Form.Label>CNPJ</Form.Label>
              <InputMask
                required
                mask="99.999.999/9999-99"
                placeholder="Digite o CNPJ"
                name="cnpj"
                value={fornecedor.cnpj}
                onChange={handleChange}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">
                CNPJ é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <br />

        <Row>
          <Col md={6}>
            <Form.Group controlId="formRepresentante">
              <Form.Label>Representante</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Digite o nome do Representante"
                name="representante"
                value={fornecedor.representante}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Representante é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTelefone">
              <Form.Label>Telefone</Form.Label>
              <InputMask
                required
                mask="(99) 99999-9999"
                placeholder="Digite o Telefone"
                name="telefone"
                value={fornecedor.telefone}
                onChange={handleChange}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">
                Telefone é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <br />

        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Digite o E-mail"
                name="email"
                value={fornecedor.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                E-mail é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formEndereco">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Digite o Endereço"
                name="endereco"
                value={fornecedor.endereco}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Endereço é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <br />

        <Row>
          <Col md={6}>
            <Form.Group controlId="formBanco">
              <Form.Label>Banco</Form.Label>
              <Form.Select
                required
                name="banco"
                value={fornecedor.banco}
                onChange={handleChange}
              >
                <option value="">Selecione um banco</option>
                <option value="001 - Banco do Brasil">Banco do Brasil</option>
                <option value="237 - Bradesco">Bradesco</option>
                <option value="341 - Itaú Unibanco">Itaú</option>
                <option value="104 - Caixa Econômica">Caixa Econômica</option>
                <option value="260 - NuBank">NuBank</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Banco é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formAgencia">
              <Form.Label>Agência</Form.Label>
              <InputMask
                required
                mask="9999-9"
                name="agencia"
                value={fornecedor.agencia}
                onChange={handleChange}
                className="form-control"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formConta">
              <Form.Label>Conta</Form.Label>
              <InputMask
                required
                mask="99999999-9"
                name="conta"
                value={fornecedor.conta}
                onChange={handleChange}
                className="form-control"
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Button variant="primary" type="submit">
          Adicionar
        </Button>
      </Form>
      <br />

      <h3>Lista de Fornecedores</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Razão Social</th>
            <th>CNPJ</th>
            <th>Representante</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Banco</th>
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
              <td>{item.banco}</td>
              <td><Button variant="danger" onClick={() => handleDelete(index)}>Excluir</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default FornecedorForm;
