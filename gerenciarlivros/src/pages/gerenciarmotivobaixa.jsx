import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Table, InputGroup } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import MotivoBaixaService from "../services/MotivoBaixaService.js"; // Crie o serviço necessário
import './motivosbaixa.css'; // Atualize o nome do arquivo CSS conforme necessário

const motivoBaixaService = new MotivoBaixaService();

function MotivosBaixa() {
  const [motivoBaixa, setMotivoBaixa] = useState({
    id: "",
    motivo: "",
    data: "",
  });
  const [listaMotivos, setListaMotivos] = useState([]);
  const [validated, setValidated] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [listaFiltrada, setListaFiltrada] = useState([]);

  useEffect(() => {
    motivoBaixaService.obterTodosMotivos()
      .then((response) => {
        setListaMotivos(response.data || []);
        setListaFiltrada(response.data || []);
      })
      .catch((erro) => {
        console.error("Erro ao buscar os motivos de baixa:", erro);
      });
  }, []);

  useEffect(() => {
    setListaFiltrada(listaMotivos.filter((item) =>
      item.motivo.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm, listaMotivos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMotivoBaixa((prev) => ({ ...prev, [name]: value }));
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
      motivoBaixaService.atualizarMotivo(listaMotivos[editingIndex].id, motivoBaixa)
        .then((response) => {
          const updatedLista = [...listaMotivos];
          updatedLista[editingIndex] = response.data;
          setListaMotivos(updatedLista);
          setEditingIndex(null);
        })
        .catch((erro) => {
          console.error("Erro ao atualizar motivo:", erro);
        });
    } else {
      motivoBaixaService.cadastrarMotivo(motivoBaixa)
        .then((response) => {
          setListaMotivos([...listaMotivos, response.data]);
        })
        .catch((erro) => {
          console.error("Erro ao cadastrar motivo:", erro);
        });
    }

    resetarFormulario();
  };

  const handleEdit = (index) => {
    setMotivoBaixa(listaMotivos[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este motivo de baixa?")) {
      const motivoId = listaMotivos[index].id;
      motivoBaixaService.deletarMotivo(motivoId)
        .then(() => {
          setListaMotivos(listaMotivos.filter((_, i) => i !== index));
        })
        .catch((erro) => {
          console.error("Erro ao excluir motivo:", erro);
        });
    }
  };

  const resetarFormulario = () => {
    setMotivoBaixa({ id: "", motivo: "", data: "" });
    setValidated(false);
    setEditingIndex(null);
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <>
      <Stack gap={2} className="motivo-baixa">
        <div className="p-2">
          <div className="card">
            <h5 className="card-header">{editingIndex !== null ? "Editar Motivo de Baixa" : "Cadastrar Motivo de Baixa"}</h5>
            <div className="card-body">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formId">
                      <Form.Label>ID</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Informe o ID"
                        name="id"
                        value={motivoBaixa.id}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        ID é obrigatório.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formMotivo">
                      <Form.Label>Motivo</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Informe o motivo"
                        name="motivo"
                        value={motivoBaixa.motivo}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Motivo é obrigatório.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formData">
                      <Form.Label>Data</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        name="data"
                        value={motivoBaixa.data}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Data é obrigatória.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Button variant="success" type="submit" className="m-2">
                  Salvar
                </Button>
                <Button variant="secondary" type="button" onClick={resetarFormulario}>
                  Cancelar
                </Button>
              </Form>
            </div>
          </div>
        </div>

        <div className="p-2">
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Buscar por motivo"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>

          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Motivo</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.motivo}</td>
                  <td>{item.data}</td>
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

export default MotivosBaixa;
