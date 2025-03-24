import { Form, Card, Row, Col, Button, Table, InputGroup } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import '../Componentes/FormLivros/formlivros.css';
import { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import LivroService from '../services/LivroService';
import AutorService from '../services/AutorService';
import CategoriaService from '../services/CategoriaService';
import GeneroService from '../services/GeneroService';

const livroService = new LivroService();
const service = new AutorService();
const categoriaService = new CategoriaService();
const generoService = new GeneroService();



function FormLivros() {
  const [Livro, setLivro] = useState({
    Titulo: '',
    Autor: '',
    Editora: '',
    Ano: '',
    ISBN: '',
    NumeroDePaginas: '',
    Genero: '',
    Estado: '',
    Tombo: '',
    DataDeCadastro: '',
    Observacoes: '',
    Categoria: ''
  });

  const [listaLivros, setListaLivros] = useState([]);
  const [indexEditando, setIndexEditando] = useState(null);
  const [validated, setValidated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [ListaFiltrada, setListaFiltrada] = useState([]);
  const [listaAutor, setListaAutor] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaGeneros, setListaGeneros] = useState([]);

  
  // Função auxiliar para formatar datas no padrão dd/MM/yyyy
  const formatarData = (data) => {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const carregarGeneros = async () => {
    try {
      const response = await generoService.carregarGeneros();
      setListaGeneros(response.data || []);
    } catch (erro) {
      console.error('Erro ao carregar generos:', erro);
    }
  }

  const carregarCategorias = async () => {
    try {
      const response = await categoriaService.carregarCategorias();
      setListaCategorias(response.data || []);
    } catch (erro) {
      console.error('Erro ao carregar categorias:', erro);
  }
  };

  const carregarAutores = async () => {
    
    try {
      const response = await service.obterTodosAutores();
      setListaAutor(response.data || []);
    } catch (erro) {
      console.error('Erro ao carregar autores:', erro);
    }
  }
   

  const carregarLivros = async () => {
    try {
      const response = await livroService.obterTodosLivros();
      setListaLivros(response.data || []);
      setListaFiltrada(response.data || []);
    } catch (erro) {
      console.error('Erro ao carregar livros:', erro);
    }
  };

  useEffect(() => {
    carregarAutores();
    carregarLivros();
    carregarCategorias();
    carregarGeneros();
  }, []);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
  
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
  
    setValidated(true);
  
    try {
      if (indexEditando !== null) {
        await livroService.atualizarLivro(listaLivros[indexEditando].id, Livro);
      } else {
        await livroService.cadastrarLivro(Livro);
      }
      await carregarLivros(); // Recarrega os livros após salvar
      resetarFormulario();
    } catch (erro) {
      console.error('Erro ao salvar livro:', erro);
      alert('Erro ao salvar livro. Tente novamente.');
    }
  };
  
  const resetarFormulario = () => {
    setLivro({
      Titulo: '',
      Autor: '',
      Editora: '',
      Ano: '',
      ISBN: '',
      NumeroDePaginas: '',
      Genero: '',
      Estado: '',
      Tombo: '',
      DataDeCadastro: '',
      Observacoes: '',
      Categoria: ''
    });
    setValidated(false);
    setIndexEditando(null);
  };

  const handleEdit = (index) => {
    const livroSelecionado = listaLivros[index];
    setLivro({ ...livroSelecionado });
    setIndexEditando(index);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await livroService.deletarLivro(id);
        const novaLista = listaLivros.filter((livro) => livro.id !== id);
        setListaLivros(novaLista);
        aplicarFiltro(searchTerm, novaLista);
      } catch (erro) {
        console.error('Erro ao excluir livro:', erro);
        alert('Erro ao excluir livro. Tente novamente.');
      }
    }
  };

  const handleFiltrarChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    aplicarFiltro(value);
  };

  const aplicarFiltro = (termo, lista = listaLivros) => {
    if (termo.trim() === '') {
      setListaFiltrada(lista);
    } else {
      setListaFiltrada(
        lista.filter((livro) =>
          livro.Titulo.toLowerCase().includes(termo.toLowerCase()) ||
          livro.Autor.toLowerCase().includes(termo.toLowerCase()) ||
          livro.Genero.toLowerCase().includes(termo.toLowerCase())
        )
      );
    }
  };

    return (
        <Stack gap={2} className='FormLivros'>
            <div className="p-2">
                <Form noValidate  validated={validated} onSubmit={handleSubmit}   >
                    <Card className="mb-3">
                        <Card.Header>
                          <h5 className="m-0">{indexEditando === null ? 'Cadastrar Livro' : 'Editar Livro'}</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group controlId="FormTitulo" className="mb-3">
                              <label>Titulo </label>
                                <Form.Control 
                                type="text"
                                placeholder="Digite o título do Livro" 
                                name="Titulo"
                                value={Livro.Titulo}
                                onChange={handleChange}
                                required 
                                isInvalid={validated && Livro.Titulo.trim() === ''}
                                />
                                <Form.Control.Feedback type="invalid">
                                  o Título completo do Livro é obrigatório.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row className="mb-3">
                                <Col md={6}>
                                <Form.Group controlId="FormAutor">
                                  <label>Autor</label>
                                  <Form.Select
                                    name="Autor"
                                    value={Livro.Autor}
                                    onChange={handleChange}
                                    isInvalid={validated && Livro.Autor.trim() === ''}
                                    required
                                  >
                                    <option value="">Selecione um autor</option>
                                    {listaAutor?.map((autor) => (
                                      <option key={autor.id} value={autor.Nome + ' ' + autor.Sobrenome} >
                                        {autor.Nome} {autor.Sobrenome}
                                      </option>
                                    ))}
                                  </Form.Select>
                                  <Form.Control.Feedback type="invalid">
                                    O nome do autor é obrigatório.
                                  </Form.Control.Feedback>
                                </Form.Group>

                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="FormEditora">
                                        <label>Editora </label>
                                        <Form.Control
                                        type="text"
                                        placeholder="Digite a editora do Livro" 
                                        name="Editora"
                                        value={Livro.Editora}
                                        onChange={handleChange}
                                        isInvalid={validated && Livro.Editora.trim() === ''}
                                        required />
                                        <Form.Control.Feedback type="invalid">
                                           Editora do Livro é obrigatorio.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId='FormAno'>
                                        <label>Data de publicação </label>
                                        <Form.Control
                                        title="Data publicação"
                                        type="date" 
                                        name="Ano"
                                        value={Livro.Ano ? Livro.Ano.split('T')[0] : ''}
                                        onChange={handleChange}
                                        isInvalid={validated && Livro.Ano.trim() === ''}
                                        required />
                                        <Form.Control.Feedback type="invalid">
                                           A data de publicação do Livro é obrigatorio.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                <Form.Group controlId="FormCategoria">
                              <label>Categoria</label>
                              <Form.Select
                                name="Categoria"
                                value={Livro.Categoria}
                                onChange={handleChange}
                                isInvalid={validated && Livro.Categoria.trim() === ''}
                                required
                              >
                                <option value="">Selecione uma categoria</option>
                                {listaCategorias?.map((categoria) => (
                                  <option key={categoria.id} value={categoria.descricao}>
                                    {categoria.descricao}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                A Categoria do Livro é obrigatória.
                              </Form.Control.Feedback>
                            </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6}>
                                        <Form.Group controlId="FormISBN">
                                        <label>ISBN </label>
                                        <InputMask
                                        mask="999-99-999-9999-9"                                  
                                        type="text"
                                        placeholder="Digite o ISBN"
                                        name="ISBN"
                                        value={Livro.ISBN}
                                        onChange={handleChange}
                                        className='form-control'
                                        isInvalid={validated && Livro.ISBN.toString().trim() === ''}
                                        required />
                                        <Form.Control.Feedback type="invalid">
                                             O ISBN da obra é obrigatorio.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="FormPaginas">
                                        <label>Número de Páginas </label>
                                        <Form.Control 
                                        type="text" 
                                        maxLength={4}
                                        placeholder="Digite o número de Páginas" 
                                        name="NumeroDePaginas"
                                        value={Livro.NumeroDePaginas}
                                        onChange={handleChange}
                                        className='form-control'
                                        isInvalid={validated && Livro.NumeroDePaginas.toString().trim() === ''}
                                        required/>
                                        <Form.Control.Feedback type="invalid">
                                          O número de páginas do livro é obrigatorio.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="FormGenero" className="mb-3">
                              <label>Gênero</label>
                              <Form.Select
                              name="Genero"
                              value={Livro.Genero}
                              onChange={handleChange}
                              isInvalid={validated && Livro.Genero.trim() === ''}
                              required
                              >
                              <option value="">Selecione um gênero</option>
                              {listaGeneros?.map((genero) => (
                                <option key={genero.id} value={genero.descricao}>
                                  {genero.descricao}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              O gênero do livro é obrigatório.
                            </Form.Control.Feedback>
                           </Form.Group>

                            <Form.Group className="mb-3">
                                <label>  Estado conservação do livro </label>
                                <Form.Select 
                                name="Estado"
                                value={Livro.Estado}
                                onChange={handleChange}
                                isInvalid={validated && Livro.Estado.trim() === ''}
                                required
                                >
                                    <option value="">Selecione o estado do livro</option>
                                    <option value="Novo">Novo</option>
                                    <option value="Usado">Usado</option>
                                    <option value="Danificado">Danificado</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                     O estado  de conservação do livro é obrigatorio.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row className="mb-3">
                                <Col md={3}>
                                    <Form.Group controlId="FormTombo">
                                        <label> Nº do Tombo </label>
                                        <Form.Control 
                                        type="text"
                                        placeholder=" Digite o Nº do Tombo"
                                        maxLength={5}
                                        name="Tombo"
                                        value={Livro.Tombo}
                                        onChange={handleChange}
                                        isInvalid={validated && Livro.Tombo.toString().trim() === ''}
                                        required />
                                        <Form.Control.Feedback type="invalid">
                                           O Tombo do livro é obrigatorio.    
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="FormDataDeCadastro">
                                        <label> Data de Cadastro </label>
                                        <Form.Control 
                                        title="Data cadastro"
                                        type="date" 
                                        name="DataDeCadastro"
                                        value={Livro.DataDeCadastro ? Livro.DataDeCadastro.split('T')[0] : ''}
                                        onChange={handleChange}
                                        isInvalid={validated && Livro.DataDeCadastro.trim() === ''}
                                        required />
                                        <Form.Control.Feedback type="invalid">
                                           A data de cadastro é obrigatória.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="FormObservacoes">
                                        <label> Observações </label>
                                        <Form.Control as="textarea" rows={3}
                                        name="Observacoes"
                                        placeholder="Digite as Observações necessárias"
                                        value={Livro.Observacoes}
                                        onChange={handleChange}
                                        isInvalid={validated && Livro.Observacoes.trim() === ''}
                                        required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                           As observações são obrigatórias.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="success" type='submit'  className="m-2">
                                <i className="bi bi-check-lg">Salvar</i>
                            </Button>
                            <Button variant="secondary" type="button" onClick={resetarFormulario}>Cancelar</Button>

                        </Card.Body>
                    </Card>
                </Form>
            </div>
            <div className="p-2">
            <InputGroup className="mb-3 input-filtro">
          <Form.Control
            type="text"
            placeholder="Buscar por Título, Autor, Gênero."
            value={searchTerm}
            onChange={handleFiltrarChange}
          />
        </InputGroup>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
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
              
                    {(() => {

                        if (ListaFiltrada.length > 0) {
                            return ListaFiltrada.map((livro, index) => (
                            <tr key={ livro.id}>  
                            <td>{livro.id}</td>                              
                            <td>{livro.Titulo}</td>
                            <td>{livro.Autor}</td>
                            <td>{livro.Editora}</td>
                            <td>{formatarData(livro.Ano)}</td>
                            <td>{livro.Categoria}</td>
                            <td>{livro.ISBN}</td>
                            <td>{livro.NumeroDePaginas}</td>
                            <td>{livro.Genero}</td>
                            <td>{livro.Estado}</td>
                            <td>{livro.Tombo}</td>
                            <td>{formatarData(livro.DataDeCadastro)}</td>
                            <td>{livro.Observacoes}</td>
                             <td>
                                <Button variant="primary" onClick={() => handleEdit(index)} className="m-2">Editar</Button>
                                <Button variant="danger" onClick={() => handleDelete(livro.id)}>Excluir</Button>
                            </td>
                            </tr>));
                            } else {
                                 return (
                                 <tr>
                                    <td colSpan="13" className="text-center"> Nenhum livro cadastrado

                                    </td>
                                </tr>
                                 );
                                }
                                })()}
                </tbody>
            </Table>
            </div>
            
        </Stack>
    );
}



export default FormLivros;