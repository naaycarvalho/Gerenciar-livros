import { Table, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GeneroService from '../../services/GeneroService';

const generoService = new GeneroService();

function ListGenero({ onEditarGenero, onExcluirGenero }){
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        buscarGeneros('');
    }, [onEditarGenero, onExcluirGenero]);

    const buscarGeneros = (filtro) =>{
        generoService.obterGeneros(filtro).then((response) => {
            setGeneros(response.data || []);
        }).catch((erro) => {
            console.error('Erro ao buscar o gênero:', erro);
        });
    }

    // Função para lidar com a mudança no campo de busca
    const handleFiltroChange = (e) => {
        buscarGeneros(e.target.value);
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
                        generos.length > 0 
                        ? (generos.sort((a, b) => a.descricao.localeCompare(b.descricao)).map((genero) => (
                            <tr key={genero.id}>
                                <td>{genero.descricao}</td>
                                <td>{tipoGeneroDescricao[genero.tipoGenero]}</td>
                                <td>
                                    <Button variant="primary" size="sm" onClick={() => onEditarGenero(genero.id)}>Editar</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => onExcluirGenero(genero.id)}>Excluir</Button>
                                </td>
                            </tr>
                        ))) 
                        : (
                            <tr>
                                <td colSpan="3" className="text-center">Nenhum gênero cadastrado</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </>

    )
}

// Validar as propiedades
ListGenero.propTypes = {
    onEditarGenero: PropTypes.func.isRequired,
    onExcluirGenero: PropTypes.func.isRequired,
};


// Mapeamento entre o valor e a descrição do tipo de gênero
const tipoGeneroDescricao = {
    ficcao: "Ficção",
    naoFiccao: "Não ficção",
    poesiaTeatro: "Poesia e teatro",
    outros: "Outros"
};

export default ListGenero;