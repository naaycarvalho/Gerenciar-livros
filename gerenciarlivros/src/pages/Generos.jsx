import { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import FormGenero from '../Componentes/Generos/FormGenero';
import ListGenero from '../Componentes/Generos/ListGenero';
import './generos.css';
import GeneroService from '../services/GeneroService';

const generoService = new GeneroService();

function Generos() {
  const [generoId, setGeneroId] = useState(0);
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
  }, [generoId, alert]);

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

  // Função para adicionar um novo gênero
  const salvarGenero = (genero) => {
    if (generoId > 0) {
      generoService.atualizarGenero(generoId, genero).then((response) => {
        handleShowAlert('success', response.message);
      }).catch((erro) => {
        console.error('Erro ao alterar o gênero:', erro);
        handleShowAlert('danger', 'Erro ao alterar o gênero.');
      });
    } else {
      generoService.cadastrarGenero(genero).then((response) => {
        handleShowAlert('success', response.message);
      }).catch((erro) => {
        console.error('Erro ao cadastrar o gênero:', erro);
        handleShowAlert('danger', 'Erro ao cadastrar o gênero.');
      });
    }
    cancelar();
  };

  // Função para iniciar a edição de um gênero
  const editarGenero = (id) => {
    setGeneroId(id); 
  };

  // Função para excluir um gênero
  const excluirGenero = (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir o gênero?");

    if (confirmar) {
      generoService.deletarGenero(id).then(() => {
        handleShowAlert('success', 'gênero excluido com sucesso.');
      }).catch((erro) => {
        console.error('Erro ao excluir o gênero:', erro);
        handleShowAlert('danger', 'Erro ao excluir o gênero.');
      });
    }
  };

  const cancelar = () => {
    setGeneroId(0);
  }

  return (
    <>
      <Alert className='genero-alert' show={alert.show} variant={alert.variant} onClose={handleCloseAlert} dismissible>
        <p>{alert.message}</p>
      </Alert>
      <Stack gap={2} className='generos'>
        <div className="p-2">
          <FormGenero generoId={generoId} onSalvarGenero={salvarGenero} onCancelar={cancelar} />
        </div>
        <div className="p-2">
          <ListGenero onEditarGenero={editarGenero} onExcluirGenero={excluirGenero} />
        </div>
      </Stack>
    </>
  )
  }
  export default Generos;