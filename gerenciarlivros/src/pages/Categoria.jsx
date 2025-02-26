import { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import FormCategoria from '../Componentes/Categorias/FormCategoria';
import ListCategoria from '../Componentes/Categorias/ListCategoria';
import CategoriaService from '../services/CategoriaService';
import './categoria.css';

const categoriaService = new CategoriaService();

function Categoria() {
    const [categoriaId, setCategoriaId] = useState(0);
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
    }, [categoriaId, alert]);
  
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
  
    // Função para adicionar uma nova categoria
    const salvarCategoria = (categoria) => {
      if (categoriaId > 0) {
        categoriaService.atualizarCategoria(categoriaId, categoria).then((response) => {
          handleShowAlert('success', response.message);
        }).catch((erro) => {
          console.error('Erro ao alterar o categoria:', erro);
          handleShowAlert('danger', 'Erro ao alterar o categoria.');
        });
      } else {
        categoriaService.cadastrarCategoria(categoria).then((response) => {
          handleShowAlert('success', response.message);
        }).catch((erro) => {
          console.error('Erro ao cadastrar o categoria:', erro);
          handleShowAlert('danger', 'Erro ao cadastrar o categoria.');
        });
      }
      cancelar();
    };
  
    // Função para iniciar a edição de uma categoria
    const editarCategoria = (id) => {
      setCategoriaId(id); 
    };
  
    // Função para excluir uma categoria
    const excluirCategoria = (id) => {
      const confirmar = window.confirm("Tem certeza que deseja excluir a categoria?");
  
      if (confirmar) {
        categoriaService.deletarCategoria(id).then(() => {
          handleShowAlert('success', 'categoria excluida com sucesso.');
        }).catch((erro) => {
          console.error('Erro ao excluir o categoria:', erro);
          handleShowAlert('danger', 'Erro ao excluir o categoria.');
        });
      }
    };
  
    const cancelar = () => {
      setCategoriaId(0);
    }
  
    return (
      <>
        <Alert className='categoria-alert' show={alert.show} variant={alert.variant} onClose={handleCloseAlert} dismissible>
          <p>{alert.message}</p>
        </Alert>
        <Stack gap={2} className='categorias'>
          <div className="p-2">
            <FormCategoria categoriaId={categoriaId} onSalvarCategoria={salvarCategoria} onCancelar={cancelar} />
          </div>
          <div className="p-2">
            <ListCategoria onEditarCategoria={editarCategoria} onExcluirCategoria={excluirCategoria} />
          </div>
        </Stack>
      </>
    )
    }
    export default Categoria;