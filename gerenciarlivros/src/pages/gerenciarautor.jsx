import { Form, Card, Row, Col, Button, Table, InputGroup } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import '../Componentes/FormLivros/formlivros.css';
import { useState, useEffect } from 'react';
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
  const [indexEditando, setIndexEditando] = useState(null);
  const [validated, setValidated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [listaFiltrada, setListaFiltrada] = useState([]);

  const formatarData = (data) => {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  useEffect(() => {
    carregarAutor();
  }, [listaAutor]);

  const carregarAutor = async () => {
    try {
      const response = await autorService.obterTodosAutores();
      setListaAutor(response.data || []);
      setListaFiltrada(response.data || []);
    } catch (erro) {
      console.error('Erro ao carregar autores:', erro);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAutor((prevAutor) => ({
      ...prevAutor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados do autor para salvar:', autor);
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    try {
      if (indexEditando !== null) {
        const autorAtualizado = await autorService.atualizarAutor(listaAutor[indexEditando].id, autor);
        const autoresAtualizados = [...listaAutor];
        autoresAtualizados[indexEditando] = autorAtualizado.data;
        setListaAutor(autoresAtualizados);
        setListaFiltrada(autoresAtualizados);
      } else {
        const autorCadastrado = await autorService.cadastrarAutor(autor);
        setListaAutor((prevLista) => [...prevLista, autorCadastrado.data]);
        setListaFiltrada((prevLista) => [...prevLista, autorCadastrado.data]);
      }
      resetarFormulario();
    } catch (erro) {
      console.error('Erro ao salvar autor:', erro);
      alert('Erro ao salvar autor. Tente novamente.');
    }
  };

  const resetarFormulario = () => {
    setAutor({
      Nome: '',
      Sobrenome: '',
      Nacionalidade: '',
      DataDeNascimento: '',
      Biografia: '',
    });
    setValidated(false);
    setIndexEditando(null);
  };

  const handleEdit = (index) => {
    const autorSelecionado = listaAutor[index];
    setAutor({ ...autorSelecionado });  // Atualiza o estado do autor com os dados do autor selecionado
    setIndexEditando(index);  // Armazena o índice do autor que será editado
  };
  

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este autor?')) {
      try {
        await autorService.deletarAutor(id);
        const novaLista = listaAutor.filter((autor) => autor.id !== id);
        setListaAutor(novaLista);
        setListaFiltrada(novaLista);
      } catch (erro) {
        console.error('Erro ao excluir autor:', erro);
        alert('Erro ao excluir autor. Tente novamente.');
      }
    }
  };

  const handleFiltrarChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setListaFiltrada(listaAutor);
    } else {
      setListaFiltrada(
        listaAutor.filter(
          (autor) =>
            autor.Nome.toLowerCase().includes(value.toLowerCase()) ||
            autor.Sobrenome.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <Stack gap={2} className="FormAutores">
      <div className="p-2">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Card className="mb-3">
            <Card.Header>{indexEditando === null ? 'Cadastrar Autor' : 'Editar Autor'}</Card.Header>
            <Card.Body>
              <Form.Group controlId="FormNome" className="mb-3">
                <label>Nome</label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do Autor"
                  name="Nome"
                  value={autor.Nome}
                  onChange={handleChange}
                  required
                  isInvalid={validated && autor.Nome.trim() === ''}
                />
                <Form.Control.Feedback type="invalid">O nome do autor é obrigatório.</Form.Control.Feedback>
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="FormSobrenome">
                    <label>Sobrenome</label>
                    <Form.Control
                      type="text"
                      placeholder="Digite o sobrenome do autor"
                      name="Sobrenome"
                      value={autor.Sobrenome}
                      onChange={handleChange}
                      isInvalid={validated && autor.Sobrenome.trim() === ''}
                      required
                    />
                    <Form.Control.Feedback type="invalid">O sobrenome do autor é obrigatório.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="FormNacionalidade">
                    <label>Nacionalidade</label>
                    <Form.Control
                      type="text"
                      placeholder="Digite a nacionalidade"
                      name="Nacionalidade"
                      value={autor.Nacionalidade}
                      onChange={handleChange}
                      isInvalid={validated && autor.Nacionalidade.trim() === ''}
                      required
                    />
                    <Form.Control.Feedback type="invalid">A nacionalidade é obrigatória.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="FormDataDeNascimento">
                    <label>Data de Nascimento</label>
                    <Form.Control
                      type="date"
                      name="DataDeNascimento"
                      value={autor.DataDeNascimento ? autor.DataDeNascimento.split('T')[0] : ''} // Converte para o formato YYYY-MM-DD
                      onChange={handleChange}
                      isInvalid={validated && autor.DataDeNascimento.trim() === ''}
                      required
                    />
                    <Form.Control.Feedback type="invalid">A data de nascimento é obrigatória.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="FormBiografia">
                    <label>Biografia</label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="Biografia"
                      placeholder="Digite a biografia do autor"
                      value={autor.Biografia}
                      onChange={handleChange}
                      isInvalid={validated && autor.Biografia.trim() === ''}
                      required
                    />
                    <Form.Control.Feedback type="invalid">A biografia é obrigatória.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="success" type="submit" className="m-2">
                <i className="bi bi-check-lg">Salvar</i>
              </Button>
              <Button variant="secondary" type="button" onClick={resetarFormulario}>
                Cancelar
              </Button>
            </Card.Body>
          </Card>
        </Form>
      </div>
      <div className="p-2">
        <InputGroup className="mb-3 input-filtro">
          <Form.Control
            type="text"
            placeholder="Buscar por Nome ou Sobrenome"
            value={searchTerm}
            onChange={handleFiltrarChange}
          />
        </InputGroup>
        <Table responsive striped bordered hover>
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
            {listaFiltrada.length > 0 ? (
              listaFiltrada.map((autor, index) => (
                <tr key={autor.id}>
                  <td>{autor.id}</td>
                  <td>{autor.Nome}</td>
                  <td>{autor.Sobrenome}</td>
                  <td>{autor.Nacionalidade}</td>
                  <td>{formatarData(autor.DataDeNascimento)}</td>
                  <td>{autor.Biografia}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleEdit(index)} className="m-2">
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(autor.id)}>
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Nenhum autor cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Stack>
  );
}

export default FormAutores;
