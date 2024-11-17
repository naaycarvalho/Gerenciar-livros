import React from 'react';
import { Table, Button } from 'react-bootstrap';

// Mapeamento entre o valor e a descrição do tipo de usuário
const tipoUsuarioDescricao = {
    aluno: "Aluno",
    professor: "Professor",
    funcionario: "Funcionário",
    publico: "Público Externo"
  };

function ListUser({ usuarios, onEditarUsuario, onExcluirUsuario }){
    return (
        <Table striped bordered hover>
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
                    ? (usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.cpf}</td>
                            <td>{usuario.dataNascimento}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.telefone}</td>
                            <td>{tipoUsuarioDescricao[usuario.tipoUsuario]}</td>
                            <td>
                                <Button variant="primary" size="sm" onClick={() => onEditarUsuario(index)}>Editar</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => onExcluirUsuario(index)}>Excluir</Button>
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
    )
}

export default ListUser;