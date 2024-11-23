import { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import FormUser from '../Componentes/Usuarios/FormUser';
import ListUser from '../Componentes/Usuarios/ListUser';
import './usuarios.css';
import ClienteService from '../services/ClienteService';

const clienteService = new ClienteService();

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioId, setUsuarioId] = useState(0);

  // Carregar os usuários do banco de dados
  const carregaUsuarios = async () =>{
    const response = await clienteService.obterTodosUsuarios();
    setUsuarios(response.data);
  }

  useEffect(() => {
    carregaUsuarios();
  });

  // Função para adicionar um novo usuário
  const salvarUsuario = (usuario, index) => {

    let novosUsuarios;
    if (index !== undefined && index !== null) {
      // Se o índice for definido, significa que estamos editando um usuário
      novosUsuarios = [...usuarios];
      novosUsuarios[index] = usuario;
    } else {
      // Caso contrário, é um novo usuário
      novosUsuarios = [...usuarios, usuario];
    }
    setUsuarios(novosUsuarios);
    localStorage.setItem('usuarios', JSON.stringify(novosUsuarios)); 
    console.log(novosUsuarios);
    cancelar();
  };

  // Função para iniciar a edição de um usuário
  const editarUsuario = (id) => {
    console.log('chegou')
    setUsuarioId(id); 
  };


// Função para excluir um usuário
  const excluirUsuario = (index) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir o usuário?");

    if (confirmar) {
        const usuariosAtualizados = [...usuarios];
        usuariosAtualizados.splice(index, 1);
        setUsuarios(usuariosAtualizados);
        localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
    }
  };

  const cancelar = () => {
    setUsuarioId(0);
  }

  return (
    <Stack gap={2} className='usuarios'>
      <div className="p-2">
        <FormUser usuarioId={usuarioId} onSalvarUsuario={salvarUsuario} onCancelar={cancelar} />
      </div>
      <div className="p-2">
        <ListUser usuarios={usuarios} onEditarUsuario={editarUsuario} onExcluirUsuario={excluirUsuario} />
      </div>
    </Stack>
  )
  }
  export default Usuarios;