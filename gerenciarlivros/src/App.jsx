import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SideBar from './Componentes/SideBar/sidebar';
import Header from './Componentes/Header/header';
import Usuarios from './pages/Usuarios';
import FornecedorForm  from './pages/gerenciarfornecedores';
import FormLivros from './pages/gerenciarlivros';
import Home from './pages/Home';
import "./App.css";
import FormAutores from './pages/gerenciarautor';
import Generos from './pages/Generos';
import MotivosBaixa from './pages/gerenciarmotivobaixa';
import Categoria from './pages/Categoria';
import Emprestimos from './pages/RegistrarEmprestimo';

function App() {
  return (
  <div className="App">
    {/* Barra Lateral */}
    <SideBar />
    {/* Main Content */}
    <div style={{ marginLeft: '280px', flex: 1 }}>
     {/* Header */}
      <Header />
      {/* Central Content Container */}
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/formlivros" element={<FormLivros />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/fornecedores" element={<FornecedorForm />} />
          <Route path="/autores" element={<FormAutores />} />
          <Route path="/generos" element={<Generos />} />
          <Route path="/motivobaixa" element={<MotivosBaixa />} />
          <Route path="/categorias" element={<Categoria />} />
          <Route path="/Emprestimos" element={<Emprestimos />} />
        </Routes>
      </Container>
    </div>
  </div>
  );
}

export default App;
