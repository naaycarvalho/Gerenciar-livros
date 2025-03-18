import { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import FormUser from '../Componentes/Usuarios/FormUser';
import ListUser from '../Componentes/Usuarios/ListUser';
import './usuarios.css';
import UsuarioService from '../services/UsuarioService';
 
const usuarioService = new UsuarioService();

function Usuarios() {
  const [usuarioId, setUsuarioId] = useState(0);
  const [alert, setAlert] = useState({
    show: false,
    variant:'success',
    message: ''
  });

  useEffect(() => {
    if (alert.show) {
      //Fechar o alerta automatico
      const timer = setTimeout(() => {
        handleCloseAlert();
      }, 1000); // Tempo do delay em milissegundos (10 segundos)

      // Limpa o timer se o componente for desmontado ou se o alerta for fechado antes
      return () => clearTimeout(timer);
    }
  }, [usuarioId, alert]);

  // Mostrar alerta
  const handleShowAlert = (type, text) => {
    setAlert({
      show: true,
      variant: type,
      message: text
    });
  }

  // Fecha o alerta
  const handleCloseAlert = () => {
    setAlert({
      show: false,
      variant:'success',
      message: ''
    }); 
  };
  // Função para adicionar um novo usuário
  const salvarUsuario = (usuario) => {
    if (usuarioId > 0) {
      usuarioService.atualizarUsuario(usuarioId, usuario).then((response) => {
        handleShowAlert('success', response.message);
      }).catch((erro) => {
        console.error('Erro ao alterar o usuário:', erro);
        handleShowAlert('danger', 'Erro ao alterar o usuário.');
      });
    } else {
      usuarioService.cadastrarUsuario(usuario).then((response) => {
        handleShowAlert('success', response.message);
      }).catch((erro) => {
        console.error('Erro ao cadastrar o usuário:', erro);
        handleShowAlert('danger', 'Erro ao cadastrar o usuário.');
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
      usuarioService.deletarUsuario(id).then(() => {
        handleShowAlert('success', 'Usuário excluido com sucesso.');
      }).catch((erro) => {
        console.error('Erro ao excluir o usuário:', erro);
        handleShowAlert('danger', 'Erro ao excluir o usuário.');
      });
    }
  };

  const cancelar = () => {
    setUsuarioId(0);
  }

  return (
    <>
      <Alert className='usuario-alert' show={alert.show} variant={alert.variant} onClose={handleCloseAlert} dismissible>
        <p>{alert.message}</p>
      </Alert>
      <Stack gap={2} className='usuarios'>
        <div className="p-2">
          <FormUser usuarioId={usuarioId} onSalvarUsuario={salvarUsuario} onCancelar={cancelar} />
        </div>
        <div className="p-2">
          <ListUser onEditarUsuario={editarUsuario} onExcluirUsuario={excluirUsuario} />
        </div>
      </Stack>
    </>
  )
  }
  export default Usuarios;