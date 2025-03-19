import { Form, Card, Row, Col, Button, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const Emprestimos = () => {
    const [titulo, setTitulo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [statusUsuario, setStatusUsuario] = useState('');
    const [integridadeLivro, setIntegridadeLivro] = useState('---');
    const [dataEmprestimo, setDataEmprestimo] = useState('');
    const [dataDevolucao, setDataDevolucao] = useState('');

    // Define a data de empréstimo automaticamente com a data atual
    useEffect(() => {
        const hoje = new Date().toISOString().split('T')[0];
        setDataEmprestimo(hoje);
        
        // Define a data de devolução (exemplo: 7 dias depois)
        let dataDev = new Date();
        dataDev.setDate(dataDev.getDate() + 7);
        setDataDevolucao(dataDev.toISOString().split('T')[0]);
    }, []);

    // Simulação da busca de status do usuário no backend
    const buscarStatusUsuario = (nome) => {
        setUsuario(nome);
        
        // Simulação de uma requisição para buscar status do usuário
        if (nome.toLowerCase() === "joão") {
            setStatusUsuario("Ativo");
        } else if (nome.toLowerCase() === "maria") {
            setStatusUsuario("Bloqueado");
        } else {
            setStatusUsuario("Desconhecido");
        }
    };

    // Simulação da busca da integridade do livro no backend
    const buscarIntegridadeLivro = (nomeLivro) => {
        setTitulo(nomeLivro);

        // Simulação de resposta da API com a integridade do livro
        if (nomeLivro.toLowerCase() === "dom quixote") {
            setIntegridadeLivro("Bom estado");
        } else if (nomeLivro.toLowerCase() === "1984") {
            setIntegridadeLivro("Desgastado");
        } else {
            setIntegridadeLivro("Desconhecido");
        }
    };

    return (
        <Stack gap={2} className='FormLivros'>
            <div className="p-2">
                <Form noValidate>
                    <Card className="mb-3">
                        <Card.Body>
                            <Form.Group controlId="FormTitulo" className="mb-3">
                                <label>Nome do Livro</label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o nome do livro"
                                    name="Titulo"
                                    value={titulo}
                                    onChange={(e) => buscarIntegridadeLivro(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    O título completo do livro é obrigatório.
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Exibir a Integridade do Livro */}
                            <Form.Group controlId="FormIntegridade" className="mb-3">
                                <label>Integridade do Livro</label>
                                <Form.Control
                                    type="text"
                                    name="Integridade"
                                    value={integridadeLivro}
                                    readOnly
                                />
                            </Form.Group>

                            <Form.Group controlId="FormUsuario" className="mb-3">
                                <label>Usuário</label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o nome do usuário"
                                    name="Usuario"
                                    value={usuario}
                                    onChange={(e) => buscarStatusUsuario(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    O nome do usuário é obrigatório.
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Exibir o Status do Usuário */}
                            <Form.Group controlId="FormStatus" className="mb-3">
                                <label>Status do Usuário</label>
                                <Form.Control
                                    type="text"
                                    name="Status"
                                    value={statusUsuario}
                                    readOnly
                                />
                            </Form.Group>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="FormDataEmprestimo" className="mb-3">
                                        <label>Data de Empréstimo</label>
                                        <Form.Control
                                            type="date"
                                            name="DataEmprestimo"
                                            value={dataEmprestimo}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="FormDataDevolucao" className="mb-3">
                                        <label>Data de Devolução</label>
                                        <Form.Control
                                            type="date"
                                            name="DataDevolucao"
                                            value={dataDevolucao}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Botão de Registrar Empréstimo */}
                            <Button variant="primary" type="submit">
                                Registrar Empréstimo
                            </Button>
                        </Card.Body>
                    </Card>
                </Form>
            </div>
        </Stack>
    );
};

export default Emprestimos;
