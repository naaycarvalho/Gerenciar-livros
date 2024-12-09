import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Table, InputGroup } from "react-bootstrap";
import InputMask from "react-input-mask";
import Stack from "react-bootstrap/Stack";
import FornecedorService from "../services/FornecedorService";
import './gerenciarfornecedores.css';


const fornecedorService = new FornecedorService();




function FornecedorForm() {
  const [fornecedor, setFornecedor] = useState({
    razaoSocial: "",
    cnpj: "",
    representante: "",
    telefone: "",
    email: "",
    endereco: "",
    banco: "",
    agencia: "",
    conta: "",
  });

  const [fornecedores, setFornecedores] = useState([]);
  const [validated, setValidated] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [listaFiltrada, setListaFiltrada] = useState([]);



















  useEffect(() => {
    setListaFiltrada(fornecedores);
  }, [fornecedores]);
  
  {listaFiltrada.map((fornecedor, index) => (
    <tr key={index}>
      {}
    </tr>
  ))}


  


  useEffect(() => {
    fornecedorService.obterTodosFornecedores()
      .then((response) => {
        setFornecedores(response.data || []);
      })
      .catch((erro) => {
        console.error('Erro ao buscar fornecedores:', erro);
      });
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFornecedor((prevFornecedor) => ({
      ...prevFornecedor,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
  
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
  
    setValidated(true);
    if (editingIndex !== null) {

      fornecedorService.atualizarFornecedor(fornecedores[editingIndex].id, fornecedor)
        .then((response) => {
          const updatedFornecedores = [...fornecedores];
          updatedFornecedores[editingIndex] = response.data;
          setFornecedores(updatedFornecedores);
          setEditingIndex(null);
        })
        .catch((erro) => {
          console.error('Erro ao atualizar fornecedor:', erro);
        });
    } else {

      fornecedorService.cadastrarFornecedor(fornecedor)
        .then((response) => {
          
          setFornecedores([...fornecedores, response.data]);
        })
        .catch((erro) => {
          console.error('Erro ao cadastrar fornecedor:', erro);
        });
    }
  

    setFornecedor({
      razaoSocial: "",
      cnpj: "",
      representante: "",
      telefone: "",
      email: "",
      endereco: "",
      banco: "",
      agencia: "",
      conta: "",
    });
    setValidated(false);
  };
  
  

  const handleDelete = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      const fornecedorId = fornecedores[index].id;
      fornecedorService.deletarFornecedor(fornecedorId)
        .then(() => {
          const updatedFornecedores = fornecedores.filter((_, i) => i !== index);
          setFornecedores(updatedFornecedores);
        })
        .catch((erro) => {
          console.error('Erro ao excluir fornecedor:', erro);
        });
    }
  };
  
  const resetarFormulario = () => {
    setFornecedor({
      razaoSocial: "",
      cnpj: "",
      representante: "",
      telefone: "",
      email: "",
      endereco: "",
      banco: "",
      agencia: "",
      conta: "",
    });
    setValidated(false);
    setEditingIndex(null);
  };

  // Editar fornecedor
  const handleEdit = (index) => {
    setFornecedor(fornecedores[index]);
    setEditingIndex(index);
  };

  const handleFiltrarChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setListaFiltrada(fornecedores);
    } else {
      setListaFiltrada(
        fornecedores.filter((fornecedor) =>
          fornecedor.razaoSocial.toLowerCase().includes(value.toLowerCase()) ||
          fornecedor.cnpj.toLowerCase().includes(value.toLowerCase()) ||
        fornecedor.representante.toLowerCase().includes(value.toLowerCase())

        )
      );
    }
  };



  return (
    <>
      <Stack gap={2} className="fornecedor">
        <div className="p-2">
          <div className="card">
            <h5 className="card-header">{editingIndex !== null ? "Editar Fornecedor" : "Cadastrar Fornecedor"}</h5>
            <div className="card-body">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>

                  <Col md={6}>
                  <Form.Label>Razão Social</Form.Label>
                    <Form.Group controlId="formRazaoSocial">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Informe a Razão Social"
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
                  <Form.Label>CNPJ</Form.Label>
                    <Form.Group controlId="formCNPJ">
                      <InputMask
                        required
                        mask="99.999.999/9999-99"
                        placeholder="Informe o CNPJ no formato xx.xxx.xxx/xxxx-xx"
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
                  <Form.Label>Representante</Form.Label>
                    <Form.Group controlId="formRepresentante">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Informe o nome do Representante"
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
                  <Form.Label>Telefone</Form.Label>
                    <Form.Group controlId="formTelefone">
                      <InputMask
                        required
                        mask="(99) 99999-9999"
                        placeholder="Informe Telefone"
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
                  <Form.Label>E-mail</Form.Label>
                    <Form.Group controlId="formEmail">
                      <Form.Control
                        required
                        type="email"
                        placeholder="Informe um e-mail válido"
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
                  <Form.Label>Endereço</Form.Label>
                    <Form.Group controlId="formEndereco">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Informe o endereço"
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
                  <Form.Label>Banco</Form.Label>
                    <Form.Group controlId="formBanco">
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
                  <Form.Label>Agência</Form.Label>
                    <Form.Group controlId="formAgencia">
                      <InputMask
                        placeholder="Informe a agência"
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
                  <Form.Label>Conta</Form.Label>
                    <Form.Group controlId="formConta">
                      <InputMask
                        placeholder="Informe a conta"
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
                <Button variant="success" type="submit" className="m-2">
                  <i className="bi bi-check-lg"></i>Salvar
                </Button>
                <Button variant="secondary" type="button" onClick={resetarFormulario}>Cancelar</Button>
              </Form>
            </div>
          </div>
        </div>


        <div className="p-2">

        <InputGroup className="mb-3 input-filtro">
          <Form.Control
            type="text"
            placeholder="Buscar por Nome, CNPJ ou Representante"
            value={searchTerm}
            onChange={handleFiltrarChange}
          />
        </InputGroup>



          <Table responsive striped bordered hover>
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
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map((item, index) => (
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
                    <Button variant="primary" onClick={() => handleEdit(index)} className="m-2">
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(index)}>
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Stack>
    </>
  );
}

export default FornecedorForm;
