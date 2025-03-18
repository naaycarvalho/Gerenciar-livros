import { useState, useEffect } from 'react';
import { Form, Card, Row, Col, Button, Table, InputGroup, Stack } from 'react-bootstrap';
import AutorService from '../services/AutorService';
import './gerenciarautor.css';

const autorService = new AutorService();

function FormAutores() {
  const [autor, setAutor] = useState({
    Nome: '',
    Sobrenome: '',
    Nacionalidade: '',
    DataDeNascimento: '',
    Biografia: '',
  });
  const [listaAutor, setListaAutor] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [indexEditando, setIndexEditando] = useState(null);
  const [validated, setValidated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    carregarAutores();
  }, []);

  useEffect(() => {
    filtrarLista();
  }, [searchTerm, listaAutor]);

  const carregarAutores = async () => {
    try {
      const response = await autorService.obterTodosAutores();
      setListaAutor(response.data || []);
      setListaFiltrada(response.data || []);
    } catch (erro) {
      console.error('Erro ao carregar autores:', erro);
    }
  };

  const filtrarLista = () => {
    if (!searchTerm.trim()) {
      setListaFiltrada(listaAutor);
    } else {
      const termo = searchTerm.toLowerCase();
      setListaFiltrada(
        listaAutor.filter(
          (autor) =>
            autor.Nome.toLowerCase().includes(termo) ||
            autor.Sobrenome.toLowerCase().includes(termo)
        )
      );
    }
  };

  const handleChange = (e) => {
    setAutor({ ...autor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    try {
      if (indexEditando !== null) {
        await autorService.atualizarAutor(indexEditando, autor);
      } else {
        await autorService.cadastrarAutor(autor);
      }
      carregarAutores();
      resetarFormulario();
    } catch (erro) {
      console.error('Erro ao salvar autor:', erro);
      alert('Erro ao salvar autor. Tente novamente.');
    }
  };

  const resetarFormulario = () => {
    setAutor({ Nome: '', Sobrenome: '', Nacionalidade: '', DataDeNascimento: '', Biografia: '' });
    setValidated(false);
    setIndexEditando(null);
  };

  const handleEdit = (id) => {
    const autorSelecionado = listaAutor.find((autor) => autor.id === id);
    if (autorSelecionado) {
      setAutor({ ...autorSelecionado });
      setIndexEditando(id);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este autor?')) {
      try {
        await autorService.deletarAutor(id);
        carregarAutores();
      } catch (erro) {
        console.error('Erro ao excluir autor:', erro);
        alert('Erro ao excluir autor. Tente novamente.');
      }
    }
  };

  const formatarData = (data) => {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Stack gap={2} className="FormAutores">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Card className="mb-3">
          <Card.Header>{indexEditando === null ? 'Cadastrar Autor' : 'Editar Autor'}</Card.Header>
          <Card.Body>
            <Form.Group controlId="FormNome" className="mb-3">
              <label>Nome</label>
              <Form.Control type="text" name="Nome" value={autor.Nome} onChange={handleChange} required />
            </Form.Group>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="FormSobrenome">
                  <label>Sobrenome</label>
                  <Form.Control type="text" name="Sobrenome" value={autor.Sobrenome} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="FormNacionalidade">
                  <label>Nacionalidade</label>
                  <Form.Control type="text" name="Nacionalidade" value={autor.Nacionalidade} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="FormDataDeNascimento">
                  <label>Data de Nascimento</label>
                  <Form.Control type="date" name="DataDeNascimento" value={autor.DataDeNascimento?.split('T')[0] || ''} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="FormBiografia">
                  <label>Biografia</label>
                  <Form.Control as="textarea" name="Biografia" value={autor.Biografia} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="success" type='submit'  className="m-2"><i className="bi bi-check-lg">Salvar</i>
            </Button>
            <Button variant="secondary" onClick={resetarFormulario}>Cancelar</Button>
          </Card.Body>
        </Card>
      </Form>
      <InputGroup className="mb-3">
        <Form.Control type="text" placeholder="Buscar por Nome ou Sobrenome" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Nacionalidade</th>
            <th>Data de Nascimento</th>
            <th>Biografia</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaFiltrada.map((autor) => (
            <tr key={autor.id}>
              <td>{autor.id}</td>
              <td>{autor.Nome}</td>
              <td>{autor.Sobrenome}</td>
              <td>{autor.Nacionalidade}</td>
              <td>{formatarData(autor.DataDeNascimento)}</td>
              <td>{autor.Biografia}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(autor.id)} className="m-2">Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(autor.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
}

export default FormAutores;
