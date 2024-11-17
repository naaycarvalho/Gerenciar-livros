import React, { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import FormUser from '../Componentes/Usuarios/FormUser'
import ListUser from '../Componentes/Usuarios/ListUser'
import './usuarios.css'

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  // Carregar a lista de usuários do localStorage
  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(usuariosSalvos);
  }, []);

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
  const editarUsuario = (index) => {
    setUsuarioEditando(usuarios[index]); 
    setUsuarioEditandoIndex(index); 
  };

  const [usuarioEditandoIndex, setUsuarioEditandoIndex] = useState(null);

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
    setUsuarioEditando(null);
    setUsuarioEditandoIndex(null);
  }

  return (
    <Stack gap={2} className='usuarios'>
      <div className="p-2">
        <FormUser onSalvarUsuario={salvarUsuario} onCancelar={cancelar} usuarioEditando={usuarioEditando} usuarioEditandoIndex={usuarioEditandoIndex}/>
      </div>
      <div className="p-2">
        <ListUser usuarios={usuarios} onEditarUsuario={editarUsuario} onExcluirUsuario={excluirUsuario} />
      </div>
    </Stack>
  )
  }
  export default Usuarios;