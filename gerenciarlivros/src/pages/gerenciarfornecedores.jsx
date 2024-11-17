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
        <h2>Cadastro de Fornecedores</h2> <br /> <br />
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formRazaoSocial">
                <Form.Label>Razão Social</Form.Label>
                <Form.Control
                className="teste"
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
          <br />
  
          <Row>
            <Col md={6}>
              <Form.Group controlId="formRepresentante">
                <Form.Label>Representante</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do Representante"
                  name="representante"
                  value={fornecedor.representante}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTelefone">
                <Form.Label>Telefone</Form.Label>
                <InputMask
                  mask="(99) 99999-9999"
                  placeholder="Digite o Telefone"
                  name="telefone"
                  value={fornecedor.telefone}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
  
          <Row>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite o E-mail"
                  name="email"
                  value={fornecedor.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEndereco">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o Endereço"
                  name="endereco"
                  value={fornecedor.endereco}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
  
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBanco">
                <Form.Label>Banco</Form.Label>
                <Form.Select
                  name="banco"
                  value={fornecedor.banco}
                  onChange={handleChange}
                >
    <option value="">Selecione um banco</option>
    <option value="070 - BRB">Banco de Brasília (BRB) - 070</option>
    <option value="001 - Banco do Brasil">Banco do Brasil - 001</option>
    <option value="756 - Bancoob">Bancoob - 756</option>
    <option value="655 - Votorantim">Banco Votorantim - 655</option>
    <option value="041 - Banrisul">Banrisul - 041</option>
    <option value="237 - Bradesco">Bradesco - 237</option>
    <option value="323 - C6 Bank">C6 Bank - 323</option>
    <option value="104 - Caixa Econômica Federal">Caixa Econômica Federal - 104</option>
    <option value="077 - Inter">Banco Inter - 077</option>
    <option value="341 - Itaú Unibanco">Itaú Unibanco - 341</option>
    <option value="399 - Mercantil do Brasil">Mercantil do Brasil - 399</option>
    <option value="380 - Neon">Neon - 380</option>
    <option value="260 - NuBank">NuBank - 260</option>
    <option value="212 - Original">Banco Original - 212</option>
    <option value="741 - PagBank">PagBank - 741</option>
    <option value="290 - PicPay">PicPay - 290</option>
    <option value="033 - Santander">Santander - 033</option>
    <option value="748 - Sicredi">Sicredi - 748</option>
    <option value="364 - Stone">Stone - 364</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formAgencia">
                <Form.Label>Agência</Form.Label>
                <InputMask
                  mask="9999-9"
                  placeholder="Digite a Agência"
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
                  mask="9999999999-9"
                  placeholder="Digite a Conta"
                  name="conta"
                  value={fornecedor.conta}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Group>
            </Col>
          </Row><br />



        <Button variant="primary" type="submit">
          Adicionar
        </Button>
      </Form>
      <br />

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
