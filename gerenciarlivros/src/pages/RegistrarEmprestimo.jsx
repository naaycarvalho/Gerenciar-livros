import { useEffect, useState } from 'react';
import { Form, Card, Row, Col, Button } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
import LivroService from '../services/LivroService';
import UsuarioService from '../services/UsuarioService';

const Emprestimo = () => {
    const [livros, setLivros] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const livroService = new LivroService();
                const usuarioService = new UsuarioService();
    
                const livrosData = await livroService.obterTodosLivros();
                const usuariosData = await usuarioService.obterUsuarios();
    
                console.log("Livros recebidos:", livrosData);
                console.log("Usuários recebidos:", usuariosData);
    
                setLivros(livrosData);
                setUsuarios(usuariosData);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };
    
        fetchData();
    }, []);
    

    return (
        <Stack gap={2} className='FormLivros'>
            <div className="p-2">
                <Form noValidate>
                    <Card className="mb-3">
                        <Card.Header>
                            <h5 className="m-0">Registrar Empréstimo</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group className="livro mb-3">
                                <Form.Label>Nome do Livro</Form.Label>
                              
                                <Form.Select>
                                     <option>Selecione o Livro</option>
                                      {(Array.isArray(livros) ? livros : []).map((livro) => (
                                        <option key={livro.id} value={livro.id}>{livro.Titulo}</option>
                                        ))}
                                        </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nome do Aluno</Form.Label>
                                            <Form.Select>
                                                <option>Selecione o Aluno</option>
                                                {(Array.isArray(usuarios) ? usuarios : []).map((usuario) => (
                                                    <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                                                    ))}
                                                    </Form.Select>
                                                    </Form.Group>
                                                    <Row className="mb-3">
                                                        <Col md={6}>
                                    <Form.Group controlId="dataEmprestimo">
                                        <Form.Label>Data de Empréstimo</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                </Col>                      
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Data de Devolução</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Status do Empréstimo</Form.Label>
                                <Form.Control type="text" placeholder="status" />
                            </Form.Group>
                            <Button variant="success" type='submit'  className="m-2">
                                <i className="bi bi-check-lg">Salvar</i>
                            </Button>
                            <Button variant="secondary" type="button" >Cancelar</Button>

                        </Card.Body>
                      
                    </Card>
                 
                </Form>
            </div>
        </Stack>
    );
};

export default Emprestimo;