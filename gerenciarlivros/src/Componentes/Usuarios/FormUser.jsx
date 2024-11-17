import React, { useState, useEffect  } from 'react';
import { Button, Form, Row, Col } from "react-bootstrap";
import { cpf } from 'cpf-cnpj-validator'
import * as yup from 'yup';
import InputMask from 'react-input-mask';

// Definindo o esquema de validação com yup
const schema = yup.object().shape({
    nome: yup.string()
        .required("O nome é obrigatório."),
    cpf: yup.string()
        .required("O CPF é obrigatório.")
        .test("valid-cpf", "CPF inválido.", value => cpf.isValid(value)),
    dataNascimento: yup.date()
        .nullable()
        .required("A data de nascimento é obrigatória.")
        .max(new Date(), "Data de nascimento não pode ser no futuro."),
    endereco: yup.string()
        .required("O endereço é obrigatório."),
    cep: yup.string()
        .required("O CEP é obrigatório.")
        .matches(/^\d{5}-\d{3}$/, "CEP inválido. Formato esperado: 12345-678"),
    telefone: yup.string()
        .required("O telefone é obrigatório.")
        .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido. Formato esperado: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX"),
    email: yup.string()
        .required("O e-mail é obrigatório.").email("E-mail inválido."),
    tipoUsuario: yup.string()
        .required('Tipo de usuário é obrigatório')       
});

function FormUser({ onSalvarUsuario, onCancelar, usuarioEditando, usuarioEditandoIndex }){
    const [nome, setNome] = useState(usuarioEditando ? usuarioEditando.nome : '');
    const [cpf, setCpf] = useState(usuarioEditando ? usuarioEditando.cpf : '');
    const [dataNascimento, setDataNascimento] = useState(usuarioEditando ? usuarioEditando.dataNascimento : '');
    const [endereco, setEndereco] = useState(usuarioEditando ? usuarioEditando.endereco : '');
    const [cep, setCep] = useState(usuarioEditando ? usuarioEditando.cep : '');
    const [telefone, setTelefone] = useState(usuarioEditando ? usuarioEditando.telefone : '');
    const [email, setEmail] = useState(usuarioEditando ? usuarioEditando.email : '');
    const [tipoUsuario, setTipoUsuario] = useState(usuarioEditando ? usuarioEditando.tipoUsuario : '');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (usuarioEditando) {
          setNome(usuarioEditando.nome);
          setCpf(usuarioEditando.cpf);
          setDataNascimento(usuarioEditando.dataNascimento);
          setEndereco(usuarioEditando.endereco);
          setCep(usuarioEditando.cep);
          setTelefone(usuarioEditando.telefone);
          setEmail(usuarioEditando.email);
          setTipoUsuario(usuarioEditando.tipoUsuario);
        }
    }, [usuarioEditando]);

    // Função para limpar o formulário
    const limparFormulario = () => {
        setNome('');
        setCpf('');
        setDataNascimento('');
        setEndereco('');
        setCep('');
        setTelefone('');
        setEmail('');
        setTipoUsuario('');
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
         // Validar e transformar a data de nascimento para null caso esteja vazia
        const validDataNascimento = dataNascimento === "" ? null : dataNascimento;

        const userData = {
            nome,
            cpf,
            dataNascimento: validDataNascimento,
            endereco,
            cep,
            telefone,
            email,
            tipoUsuario
        };

        schema
            .validate(userData, { abortEarly: false })
            .then(() => {
                onSalvarUsuario(userData, usuarioEditandoIndex);
                limparFormulario();
            })
            .catch((err) => {
                console.log(err)
                // Se houver erros de validação, atualiza o estado de erros
                const newErrors = err.inner.reduce((acc, error) => {
                  acc[error.path] = error.message;
                  return acc;
                }, {});
                setErrors(newErrors);
            });
      };

    return(
        <div className="card">
            <h5 className="card-header">{usuarioEditando ? 'Editar Usuário' : 'Cadastrar Usuário'}</h5>
            <div className="card-body">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control type='text' placeholder="Nome" 
                                value={nome} onChange={(e) => setNome(e.target.value)} isInvalid={!!errors.nome} />
                            <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
                        </Col>
                    </Row>  
                    <Row className="mb-3">
                        <Col>
                            <InputMask mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)}>
                                {(inputProps) => ( <Form.Control {...inputProps} isInvalid={!!errors.cpf} placeholder="CPF" /> )}
                            </InputMask>                                
                            <Form.Control.Feedback type="invalid">{errors.cpf}</Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Control type='date' placeholder="Data Nascimento"
                                value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} isInvalid={!!errors.dataNascimento} />
                            <Form.Control.Feedback type="invalid">{errors.dataNascimento}</Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control type='text' placeholder="Endereço" 
                                value={endereco} onChange={(e) => setEndereco(e.target.value)} isInvalid={!!errors.endereco}/>
                            <Form.Control.Feedback type="invalid">{errors.endereco}</Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <InputMask mask="99999-999" value={cep} onChange={(e) => setCep(e.target.value)}>
                                {(inputProps) => ( <Form.Control {...inputProps} isInvalid={!!errors.cep} placeholder="CEP" /> )}
                            </InputMask>                                
                            <Form.Control.Feedback type="invalid">{errors.cep}</Form.Control.Feedback>                            
                        </Col>
                        <Col>
                            <InputMask mask="(99) 99999-9999" value={telefone} onChange={(e) => setTelefone(e.target.value)}>
                                {(inputProps) => ( <Form.Control {...inputProps} isInvalid={!!errors.telefone} placeholder="Telefone" /> )}
                            </InputMask>                                
                            <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control type='email' placeholder="E-mail" 
                                value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!errors.email}/>
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Control as="select" value={tipoUsuario} 
                                onChange={(e) => setTipoUsuario(e.target.value)} isInvalid={!!errors.tipoUsuario}>
                                <option value="">Selecione um tipo de usuario</option>
                                <option value="aluno">Aluno</option>
                                <option value="professor">Professor</option>
                                <option value="funcionario">Funcionário</option>
                                <option value="publico">Público Externo</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.tipoUsuario}</Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Button variant='success' type='submit' className="m-2">
                        <i className="bi bi-check-lg"> Salvar</i>
                    </Button>
                    <Button variant='secondary' type='button' onClick={() => {limparFormulario(); onCancelar();}}>
                        Cancelar
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default FormUser;