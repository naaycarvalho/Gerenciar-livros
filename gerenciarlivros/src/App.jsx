import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';




import SideBar from './Componentes/SideBar/sidebar';
import Header from './Componentes/Header/header';
import Usuarios from './pages/gerenciarusuarios';
import FornecedorForm from './pages/gerenciarfornecedores';
import FormLivros from './pages/gerenciarlivros';
import Home from './pages/home';

function App() {
  return (
    
      <div className="App d-flex">
        {/* Barra Lateral */}
      <SideBar />
      <Container fluid>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/formlivros" element={<FormLivros />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/Fornecedor" element={<FornecedorForm  />} />
            </Routes>
          </Container>
      </div>
  
  
  );
}

export default App;
