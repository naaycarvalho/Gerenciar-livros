import { useState, useEffect  } from 'react';
import { Button, Form, Row, Col } from "react-bootstrap";
import * as yup from 'yup';
import '../../pages/usuarios.css';
import PropTypes from 'prop-types';
import CategoriaService from '../../services/CategoriaService';

const categoriaService = new CategoriaService();

const FormCategoria = ({ categoriaId, onSalvarCategoria, onCancelar }) => {
    const [descricao, setDescricao] = useState('');
    const [tipoCategoria, setTipoCategoria] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (categoriaId > 0) {
            categoriaService.obterCategoriaPorId(categoriaId).then((response) => {
                carregaFormulario(response.data);
            }).catch((erro) => {
                console.error('Erro ao buscar o categoria:', erro);
            });
        }
    }, [categoriaId]);
//////////////////////////////////////////////////////////////////////////////////////////////
    // Carregar os campos do formulário
    const carregaFormulario = (categoria) => {
        setDescricao(categoria ? categoria.descricao : '');
        setTipoCategoria(categoria ? categoria.tipoCategoria: '');
    };

    const limparFormulario = () => {
        carregaFormulario(null);
        setErrors({});
        onCancelar();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const categoriaData = { descricao, tipoCategoria };

        schema
            .validate(categoriaData, { abortEarly: false })
            .then(() => {
                onSalvarCategoria(categoriaData);
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
            <h5 className="card-header">{categoriaId > 0 ? 'Editar Categoria' : 'Cadastrar Categoria'}</h5>
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
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control as="select" value={tipoCategoria} 
                                onChange={(e) => setTipoCategoria(e.target.value)} isInvalid={!!errors.tipoCategoria}>
                                <option value="">Selecione Público-alvo </option>
                                <option value="Infantil">Crianças de 0 a 12 anos</option>
                                <option value="InfantoJuvenil">Crianças e pré-adolescentes de 10 a 14 anos</option>
                                <option value="JovemAdulto">Adolescentes e jovens adultos de 15 a 25 anos</option>
                                <option value="Adulto">Leitores acima de 18 anos</option>
                                <option value="Academico"> Estudantes, pesquisadores, profissionais</option>
                                <option value="LGBTQIA">Comunidade LGBTQIA+ e aliados</option>
                                <option value="Outros">Outros</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.tipoCategoria}</Form.Control.Feedback>
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
FormCategoria.propTypes = {
    categoriaId: PropTypes.number.isRequired, // 'categorisId' deve ser um numero e requerido
    onSalvarCategoria: PropTypes.func.isRequired, // 'onSalvarCategoria' deve ser um função e requerido
    onCancelar: PropTypes.func.isRequired, // 'onCancelar' deve ser um função e requerido
};

// Definindo o esquema de validação com yup
const schema = yup.object().shape({
    descricao: yup.string()
        .required("A descrição é obrigatória."),
    tipoCategoria: yup.string()
        .required('Tipo de categoria é obrigatório.')       
});

export default FormCategoria;