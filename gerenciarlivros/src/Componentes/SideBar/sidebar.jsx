import { Nav, Navbar,Container  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './sidebar.css';

function SideBar() {
  return (
    <Navbar bg="dark" className="p-3 sidebar">
      <Container className="d-flex flex-column h-100">
        <Link to="/" className="text-white text-decoration-none align-self-start">
          <span className="fs-4"><i className="bi bi-list"></i></span>
        </Link>
        <Nav defaultActiveKey="/" className="flex-column mt-4 mb-auto">
          <Nav.Item>
            <Nav.Link as={Link} to="/formlivros" className="text-white mb-2">
              <i className="bi bi-book"></i> Gerenciar Livros
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/usuarios" className="text-white mb-2">
              <i className="bi bi-person"></i> Gerenciar Usuários
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/fornecedores" className="text-white mb-2">
              <i className="bi bi-clipboard2-check"></i> Gerenciar Fornecedores
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/autores" className="text-white mb-2">
              <i className="bi bi-person"></i> Gerenciar Autores
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/generos" className="text-white mb-2">
              <i className="bi bi-tag"></i> Gerenciar Gêneros
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/motivobaixa" className="text-white mb-2">
              <i className="bi bi-bookmark-x"></i> Gerenciar Motivos de Baixa
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/categorias" className="text-white mb-2">
              <i className="bi bi-person-bounding-box"> Gerenciar Categorias</i>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/Emprestimos" className="text-white mb-2">
              <i className="bi bi-people"></i> Gerenciar Emprestimos
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <div className="mt-auto w-100">
          <button type="button" className="botao">
            <i className="bi bi-box-arrow-right"></i> Sair
          </button>
        </div>
      </Container>
    </Navbar>
  );
}

export default SideBar;