import { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import FormUser from '../Componentes/Usuarios/FormUser';
import ListUser from '../Componentes/Usuarios/ListUser';
import './usuarios.css';
import UsuarioService from '../services/UsuarioService';

const usuarioService = new UsuarioService();

function Usuarios() {
  const [usuarioId, setUsuarioId] = useState(0);

  useEffect(() => {
    console.log('usuarioId',usuarioId)
  }, [usuarioId]);

  // Função para adicionar um novo usuário
  const salvarUsuario = (usuario) => {
    if (usuarioId > 0) {
      usuarioService.atualizarUsuario(usuarioId, usuario).then((response) => {
        console.log(response.data);
      }).catch((erro) => {
        console.error('Erro ao cadastrar o usuário:', erro);
      });
    } else {
      usuarioService.cadastrarUsuario(usuario).then((response) => {
        console.log(response.data);
      }).catch((erro) => {
        console.error('Erro ao cadastrar o usuário:', erro);
      });
    }
    cancelar();
  };

  // Função para iniciar a edição de um usuário
  const editarUsuario = (id) => {
    setUsuarioId(id); 
  };

  // Função para excluir um usuário
  const excluirUsuario = (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir o usuário?");

    if (confirmar) {
      usuarioService.deletarUsuario(id).then((response) => {
        console.log(response.message);
      }).catch((erro) => {
        console.error('Erro ao excluir o usuário:', erro);
      });
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
        <ListUser onEditarUsuario={editarUsuario} onExcluirUsuario={excluirUsuario} />
      </div>
    </Stack>
  )
  }
  export default Usuarios;