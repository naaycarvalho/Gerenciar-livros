import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SideBar from './Componentes/SideBar/sidebar';
import Header from './Componentes/Header/header';
import Usuarios from './pages/Usuarios';
import FornecedorForm from './pages/gerenciarfornecedores';
import FormLivros from './pages/gerenciarlivros';
import Home from './pages/Home';
import "./App.css";
import FormAutores from './pages/gerenciarautor';
import Generos from './pages/Generos';
import MotivosBaixa from './pages/gerenciarmotivobaixa';
import Categoria from './pages/Categoria';
import Emprestimos from './pages/RegistrarEmprestimo';
import Login from './pages/login.jsx';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './Componentes/ProtectedRoute';
import SemAutorizacao from './pages/semautorizacao';

function App() {
  return (
    <AuthProvider>
    <Router>
          <AppContent />
    </Router>
    </AuthProvider>
  )
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  console.log('isAuthenticated',isAuthenticated)

  return (
    <div className="App">
      {isAuthenticated && <SideBar />}

      <div style={{ marginLeft: isAuthenticated ? '280px' : '0', flex: 1 }}>
        {isAuthenticated && <Header />}

        <Container className="mt-5">
        <Routes>
  <Route path="/login" element={<Login />} />

  {/* Rotas acessíveis a qualquer perfil autenticado */}
  <Route element={<ProtectedRoute  />}>
    <Route path="/" element={<Home />} />
    <Route path="/emprestimos" element={<Emprestimos />} />
  </Route>

  {/* Rotas exclusivas para administrador */}
  <Route element={<ProtectedRoute  />}>
    <Route path="/formlivros" element={<FormLivros />} />
    <Route path="/usuarios" element={<Usuarios />} />
    <Route path="/fornecedores" element={<FornecedorForm />} />
    <Route path="/autores" element={<FormAutores />} />
    <Route path="/generos" element={<Generos />} />
    <Route path="/motivobaixa" element={<MotivosBaixa />} />
    <Route path="/categorias" element={<Categoria />} />
  </Route>

  <Route path="/semautorizacao" element={<SemAutorizacao />} />

  {/* Redirecionamento padrão */}
  <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
</Routes>
        </Container>
      </div>
    </div>
  );
}


export default App;
