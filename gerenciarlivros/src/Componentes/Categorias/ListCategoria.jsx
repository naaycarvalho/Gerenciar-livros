import { Table, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CategoriaService from '../../services/CategoriaService';

const categoriaService = new CategoriaService();

function ListCategoria({ onEditarCategoria, onExcluirCategoria }){
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        buscarCategorias('');
    }, [onEditarCategoria, onExcluirCategoria]);

    const buscarCategorias = (filtro) =>{
        categoriaService.obterCategorias(filtro).then((response) => {
            setCategorias(response.data || []);
        }).catch((erro) => {
            console.error('Erro ao buscar o categorias:', erro);
        });
    }

    // Função para lidar com a mudança no campo de busca
    const handleFiltroChange = (e) => {
        buscarCategorias(e.target.value);
    };

    return (
        <>
            <Form.Control type='text' placeholder="Buscar por descrição" className='input-filtro' onChange={handleFiltroChange} />
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias.length > 0 
                        ? (categorias.sort((a, b) => a.descricao.localeCompare(b.descricao)).map((categoria) => (
                            <tr key={categoria.id}>
                                <td>{categoria.descricao}</td>
                                <td>{tipoCategoriaDescricao[categoria.tipoCategoria]}</td>
                                <td>
                                    <Button variant="primary" size="sm" onClick={() => onEditarCategoria(categoria.id)}>Editar</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => onExcluirCategoria(categoria.id)}>Excluir</Button>
                                </td>
                            </tr>
                        ))) 
                        : (
                            <tr>
                                <td colSpan="3" className="text-center">Nenhuma categoria cadastrada</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </>

    )
}

// Validar as propiedades
ListCategoria.propTypes = {
    onEditarCategoria: PropTypes.func.isRequired,
    onExcluirCategoria: PropTypes.func.isRequired,
};


// Mapeamento entre o valor e a descrição do tipo de categoria
const tipoCategoriaDescricao = {
    Infantil: "Infantil(0 a 12 anos)",
    InfantoJuvenil: "Infanto juvenil(10 a 14anos)",
    JovemAdulto: "Jovem Adulto(15 a 25anos)",
    Adulto: "Adulto(acima de 18anos)",
    Academico: "Acadêmico( Estudantes, pesquisadores, profissionais)",
    LGBTQIA: "LGBTQIA+ (Comunidade LGBTQIA+ e aliados)",
    Outros: "Outros"
};

export default ListCategoria;