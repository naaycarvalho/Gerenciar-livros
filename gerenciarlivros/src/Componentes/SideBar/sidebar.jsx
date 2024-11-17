import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './sidebar.css';

function SideBar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white SideBar" >
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4"><i className="bi bi-list"></i></span>
      </Link>
      <hr />
      <Nav className="flex-column mb-auto">
        <Nav.Item>
          <Nav.Link as={Link} to="/FormLivros" className="text-white">
            <i className="bi bi-book"></i> Gerenciar Livros
          </Nav.Link>
        </Nav.Item>
        <br />
        <Nav.Item>
          <Nav.Link as={Link} to="/Usuarios" className="text-white">
            <i className="bi bi-person-plus"></i> Gerenciar Usuários
          </Nav.Link>
        </Nav.Item>
        <br />
        <Nav.Item>
          <Nav.Link as={Link} to="/Fornecedor" className="text-white">
            <i className="bi bi-clipboard2-check"></i> Gerenciar Fornecedores
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <hr />
      <button type="button" className="botao w-100">
        <i className="bi bi-box-arrow-right"></i> Sair
      </button>
    </div>
  );
}

export default SideBar;