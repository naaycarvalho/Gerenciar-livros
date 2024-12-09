import { useState, useEffect  } from 'react';
import { Button, Form, Row, Col } from "react-bootstrap";
import * as yup from 'yup';
import '../../pages/usuarios.css';
import PropTypes from 'prop-types';
import GeneroService from '../../services/GeneroService';

const generoService = new GeneroService();

const FormGenero = ({ generoId, onSalvarGenero, onCancelar }) => {
    const [descricao, setDescricao] = useState('');
    const [tipoGenero, setTipoGenero] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (generoId > 0) {
            generoService.obterGeneroPorId(generoId).then((response) => {
                carregaFormulario(response.data);
            }).catch((erro) => {
                console.error('Erro ao buscar o gênero:', erro);
            });
        }
    }, [generoId]);

    // Carregar os campos do formulário
    const carregaFormulario = (genero) => {
        setDescricao(genero ? genero.descricao : '');
        setTipoGenero(genero ? genero.tipoGenero: '');
    };

    const limparFormulario = () => {
        carregaFormulario(null);
        setErrors({});
        onCancelar();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const generoData = { descricao, tipoGenero };

        schema
            .validate(generoData, { abortEarly: false })
            .then(() => {
                onSalvarGenero(generoData);
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
            <h5 className="card-header">{generoId > 0 ? 'Editar Gênero' : 'Cadastrar Gênero'}</h5>
            <div className="card-body">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type='text' placeholder="Digite a descrição" 
                                value={descricao} onChange={(e) => setDescricao(e.target.value)} isInvalid={!!errors.descricao} />
                            <Form.Control.Feedback type="invalid">{errors.descricao}</Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control as="select" value={tipoGenero} 
                                onChange={(e) => setTipoGenero(e.target.value)} isInvalid={!!errors.tipoGenero}>
                                <option value="">Selecione um tipo de gênero</option>
                                <option value="ficcao">Ficção</option>
                                <option value="naoFiccao">Não ficção</option>
                                <option value="poesiaTeatro">Poesia e teatro</option>
                                <option value="outros">Outros</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.tipoGenero}</Form.Control.Feedback>
                        </Col>
                    </Row>  
                    <Button variant='success' type='submit' className="m-2">
                        <i className="bi bi-check-lg"> Salvar</i>
                    </Button>
                    <Button variant='secondary' type='button' onClick={() => {limparFormulario();}}>
                        Cancelar
                    </Button>
                </Form>
            </div>
        </div>
    )
}

// Validar as propiedades
FormGenero.propTypes = {
    generoId: PropTypes.number.isRequired, // 'generoId' deve ser um numero e requerido
    onSalvarGenero: PropTypes.func.isRequired, // 'onSalvarGenero' deve ser um função e requerido
    onCancelar: PropTypes.func.isRequired, // 'onCancelar' deve ser um função e requerido
};

// Definindo o esquema de validação com yup
const schema = yup.object().shape({
    descricao: yup.string()
        .required("A descrição é obrigatória."),
    tipoGenero: yup.string()
        .required('Tipo de gênero é obrigatório.')       
});

export default FormGenero;