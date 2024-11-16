import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';




import SideBar from './Componentes/SideBar/sidebar';
import Header from './Componentes/Header/header';
import Usuarios from './pages/gerenciarusuarios';
import Fornecedores from './pages/gerenciarfornecedores';
import FormLivros from './pages/gerenciarlivros';

function App() {
  return (
    
      <div className="App d-flex">
        {/* Barra Lateral */}
      <SideBar />
      <Container fluid>
           <Header />
            <Routes>
              <Route path="/" element={<h1>Bem-vindo ao Sistema</h1>} />
              <Route path="/formlivros" element={<FormLivros />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/fornecedores" element={<Fornecedores  />} />
            </Routes>
          </Container>
      </div>
   
  
  );
}

export default App;
