import './sidebar.css'
function SideBar() {
  return (
    <>
    <div className= "d-flex flex-column flex-shrink-0 p-3 text-white  SideBar">
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
    <span className="fs-4"><i className="bi bi-list"></i></span>
    </a>
    <hr/>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <a href="/" className="nav-link text-white border" aria-current="page" >
        
        <i className="bi bi-book"> Gerenciar Livros</i>
        </a>
      </li>
      <br/>
      <li>
        <a href="/" className="nav-link text-white border ">
        <i className="bi bi-person-plus"> Gerenciar Usuários </i>
          
       </a>
      </li>
      <br/>
      
      <li>
        <a href="/" className="nav-link text-white border ">
        <i className="bi bi-clipboard2-check">Gerenciar Fornecedores</i> 
      </a>
      </li>    
    </ul>
    <hr/>
    <button type="button" className="botao"><i className="bi bi-box-arrow-right"></i>Sair</button>
  </div>
  
    </>
  )
}

  
  


 
export default SideBar