import { Table, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UsuarioService from '../../services/UsuarioService';

const usuarioService = new UsuarioService();

function ListUser({ onEditarUsuario, onExcluirUsuario }){
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        buscarUsuarios('');
    }, [onEditarUsuario, onExcluirUsuario]);

    const buscarUsuarios = (filtro) =>{
        usuarioService.obterUsuarios(filtro).then((response) => {
            setUsuarios(response.data || []);
        }).catch((erro) => {
            console.error('Erro ao buscar o usuário:', erro);
        });
    }

    // Função para lidar com a mudança no campo de busca
    const handleFiltroChange = (e) => {
        buscarUsuarios(e.target.value);
    };

    return (
        <>
            <Form.Control type='text' placeholder="Buscar por nome, cpf ou email" className='input-filtro' onChange={handleFiltroChange} />
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Data de Nascimento</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.length > 0 
                        ? (usuarios.sort((a, b) => a.nome.localeCompare(b.nome)).map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.cpf}</td>
                                <td>{formatador.format(new Date(usuario.dataNascimento))}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.telefone}</td>
                                <td>{tipoUsuarioDescricao[usuario.tipoUsuario]}</td>
                                <td>
                                    <Button variant="primary" size="sm" onClick={() => onEditarUsuario(usuario.id)}>Editar</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => onExcluirUsuario(usuario.id)}>Excluir</Button>
                                </td>
                            </tr>
                        ))) 
                        : (
                            <tr>
                                <td colSpan="7" className="text-center">Nenhum usuário cadastrado</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </>

    )
}

// Validar as propiedades
ListUser.propTypes = {
    onEditarUsuario: PropTypes.func.isRequired,
    onExcluirUsuario: PropTypes.func.isRequired,
};

// Criar um objeto de formatação para data
const formatador = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
});

// Mapeamento entre o valor e a descrição do tipo de usuário
const tipoUsuarioDescricao = {
    aluno: "Aluno",
    professor: "Professor",
    funcionario: "Funcionário",
    publico: "Público Externo"
};

export default ListUser;