import { Form, Card, Row, Col, Button, Table, InputGroup } from 'react-bootstrap';
import '../Componentes/FormLivros/formlivros.css';
import { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

function FormLivros() {
  const [Livro, setLivro] = useState({
    Titulo: '',
    Autor: '',
    Editora: '',
    Ano: '',
    ISBN: '',
    NumeroDePaginas: '',
    Genero: 'Romance',
    Estado: 'Novo',
    Tombo: '',
    DataDeCadastro: '',
    Observacoes: ''
  });

  const [listaLivros, setListaLivros] = useState([]);
  const [indexEditando, setIndexEditando] = useState(null); // Novo estado para controlar a edição

  // Carregar lista de livros do localStorage ao carregar o componente
  useEffect(() => {
    const livrosArmazenados = JSON.parse(localStorage.getItem('Livro')) || [];
    setListaLivros(livrosArmazenados);
  }, []);

  // Atualizar estado ao digitar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value
    }));
  };

  // Submeter o formulário e salvar no localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    if (indexEditando === null) {
      // Adicionar novo livro
      const novaListaLivros = [...listaLivros, Livro];
      setListaLivros(novaListaLivros);
      localStorage.setItem('Livro', JSON.stringify(novaListaLivros));
    } else {
      // Atualizar livro existente
      const novaListaLivros = [...listaLivros];
      novaListaLivros[indexEditando] = Livro;
      setListaLivros(novaListaLivros);
      localStorage.setItem('Livro', JSON.stringify(novaListaLivros));
      setIndexEditando(null); // Resetar o índice de edição
    }

    // Limpar o formulário
    setLivro({
      Titulo: '',
      Autor: '',
      Editora: '',
      Ano: '',
      ISBN: '',
      NumeroDePaginas: '',
      Genero: 'Romance',
      Estado: 'Novo',
      Tombo: '',
      DataDeCadastro: '',
      Observacoes: ''
    });
  };

  // Excluir um livro da lista
  const handleDelete = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este livro?")) {
      const novaListaLivros = listaLivros.filter((_, i) => i !== index);
      setListaLivros(novaListaLivros);
      localStorage.setItem('Livro', JSON.stringify(novaListaLivros));
    }
  };

  // Editar um livro da lista
  const handleEdit = (index) => {
    const livroParaEditar = listaLivros[index];
    setLivro(livroParaEditar);
    setIndexEditando(index); // Definir o índice do livro que está sendo editado
  };

    return (
        <Form onSubmit={handleSubmit} className='FormLivros'  >
            <Card className="mb-3">
                <Card.Header>Cadastrar Livro</Card.Header>
                <Card.Body>
                    <Form.Group controlId="FormTitulo" className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control 
                        type="text"
                        placeholder="Título do Livro" 
                        name="Titulo"
                        value={Livro.Titulo}
                        onChange={handleChange}
                        required 
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, digite o Título completo.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="FormAutor">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Autor do Livro"
                                name="Autor"
                                value={Livro.Autor}
                                onChange={handleChange}
                                required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite o nome do Autor completo.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="FormEditora">
                                <Form.Label>Editora</Form.Label>
                                <Form.Control
                                 type="text"
                                 placeholder="Editora do Livro" 
                                 name="Editora"
                                 value={Livro.Editora}
                                 onChange={handleChange}
                                 required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite o número de edição.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId='FormAno'>
                                <Form.Label>Data de Publicação</Form.Label>
                                <Form.Control
                                 type="date" 
                                 name="Ano"
                                 value={Livro.Ano}
                                 onChange={handleChange}
                                 required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, selecione a data de publicação.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="FormCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Categoria"
                                name="Categoria"
                                value={Livro.Categoria}
                                onChange={handleChange} 
                                required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite a Categoria.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="FormISBN">
                                <Form.Label>ISBN</Form.Label>
                                <InputMask
                                 mask="999-9-9999-9999-9"
                                 type="text"
                                 placeholder="ISBN"
                                 name="ISBN"
                                 value={Livro.ISBN}
                                 onChange={handleChange}
                                 className='form-control'
                                required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite o ISBN da obra.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="FormPaginas">
                                <Form.Label>Número de Páginas</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Número de Páginas" 
                                name="NumeroDePaginas"
                                value={Livro.NumeroDePaginas}
                                onChange={handleChange}
                                required/>
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite o número de páginas.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <InputGroup controlId="FormGenero" className="mb-3">
                        <InputGroup.Text>Gênero</InputGroup.Text>
                        <Form.Select
                         name="Genero"
                         value={Livro.Genero}
                         onChange={handleChange}
                         >

                            <option>Romance</option>
                            <option value="1">Fábula</option>
                            <option value="2">Drama</option>
                            <option value="3">Terror</option>
                            <option value="4">Suspense</option>
                            <option value="5">Ficção Científica</option>
                        </Form.Select>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Estado do Livro</InputGroup.Text>
                        <Form.Select 
                        name="Estado"
                        value={Livro.Estado}
                        onChange={handleChange}>
                            <option>Novo</option>
                            <option value="1">Usado</option>
                            <option value="2">Danificado</option>
                        </Form.Select>
                    </InputGroup>

                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Group controlId="FormTombo">
                                <Form.Label>Nº do Tombo</Form.Label>
                                <Form.Control 
                                type="text"
                                placeholder="Nº do Tombo"
                                name="Tombo"
                                value={Livro.Tombo}
                                onChange={handleChange}
                                required />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="FormDataDeCadastro">
                                <Form.Label>Data de Cadastro</Form.Label>
                                <Form.Control 
                                type="date" 
                                name="DataDeCadastro"
                                value={Livro.DataDeCadastro}
                                onChange={handleChange}
                                required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="FormObservacoes">
                                <Form.Label>Observações</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                name="Observacoes"
                                value={Livro.Observacoes}
                                onChange={handleChange}
                                 />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="success" type='submit'  className="m-2">
                        <i className="bi bi-check-lg">{indexEditando === null ? 'Cadastrar' : 'Salvar'} </i>
                    </Button>
                    <Button variant="secondary" type='submit'>Cancelar</Button>
                </Card.Body>
            </Card>

            <Card className="mb-4 lista">
                <Card.Header>Lista de Livros Cadastrados</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Editora</th>
                                <th>Ano</th>
                                <th>Categoria</th>
                                <th>ISBN</th>
                                <th>Número de Páginas</th>
                                <th>Gênero</th>
                                <th>Estado</th>
                                <th>Tombo</th>
                                <th>Data de Cadastro</th>
                                <th>Observações</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listaLivros.map((livro, index) => (
                          <tr key={index}>
                            
                                <td>{livro.Titulo}</td>
                                <td>{livro.Autor}</td>
                                <td>{livro.Editora}</td>
                                <td>{livro.Ano}</td>
                                <td>{livro.Categoria}</td>
                                <td>{livro.ISBN}</td>
                                <td>{livro.NumeroDePaginas}</td>
                                <td>{livro.Genero}</td>
                                <td>{livro.Estado}</td>
                                <td>{livro.Tombo}</td>
                                <td>{livro.DataDeCadastro}</td>
                                <td>{livro.Observacoes}</td>
                                <td>
                                    <Button variant="primary" onClick={() => handleEdit(index)} className="m-2">Editar</Button>
                                    <Button variant="danger" onClick={() => handleDelete(index)} >Excluir</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Form>
    );
}

export default FormLivros;
