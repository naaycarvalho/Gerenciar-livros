import '../Componentes/FormLivros/formlivros.css'
function FormLivros() {
    return (
        <form className="FormLivros">
        <div className="card">
            <h5 className="card-header">Cadastrar Livro</h5>
            <div className="card-body">
             <div className=" mb-3">
             <label className="form-label"> Título </label>
                        <input type="text" placeholder="Título do Livro" className="form-control" id="nome" required></input>
                        <div className="invalid-feedback"> Por favor, digite o Titulo completo.
                        </div>
             </div>

             <div className="row g-3">
             <div className="mb-3 col-sm-6">
             <label className="form-label"> Autor </label>
                        <input type="text" placeholder="Autor do Livro" className="form-control" id="nome" required></input>
                        <div className="invalid-feedback"> Por favor, digite o nome do Autor completo.
                        </div>     
             </div>
             <div className="mb-3 col-sm-6">
             <label className="form-label"> Número de edição </label>
                        <input type="text" placeholder="Número de edição" className="form-control" id="nome" required></input>
                        <div className="invalid-feedback"> Por favor, digite o número de edição.
                        </div>     
             </div>
             </div>
            
            <div className="row g-3">
             <div className="mb-3 col-sm-6">
             <label className="form-label"> Data de Publicação </label>
                        <input type="date" className='form-control' required></input>
                        <div className="invalid-feedback"> Por favor, digite o número de edição.
                        </div>     
             </div>

             <div className="mb-3 col-sm-6">
             <label className="form-label"> Categoria</label>
                        <input type="text" placeholder="categoria" className="form-control" id="nome" required></input>
                        <div className="invalid-feedback"> Por favor, digite a Categoria.
                        </div>     
             </div>
             </div>
             <div className="row g-3">
             <div className="mb-3 col-sm-6">
             <label className="form-label"> IBSN</label>
                        <input type="text" placeholder="IBSN" className="form-control" id="nome" required></input>
                        <div className="invalid-feedback"> Por favor, digite o IBSN da obra.
                        </div>     
             </div>
             
             <div className="mb-3 col-sm-6">
             <label className="form-label"> Número de Páginas</label>
                        <input type="text" placeholder="Numero de Páginas" className="form-control" id="nome" required></input>
                        <div className="invalid-feedback"> Por favor, digite o Número de Páginas do Livro.
                        </div>     
             </div>
             </div>
             <div className="input-group mb-3">
                <label className="input-group-text" name="inputGroupSelect01" >Gênero</label>
                 <select className="form-select" id="inputGroupSelect01">
                    <option selected>Romance</option>
                    <option value="1">Fábula</option>
                    <option value="2">Drama</option>
                    <option value="3">Terror</option>
                    <option value="4">Suspense</option>
                    <option value="5">Ficção Cientifica</option>
                   
                </select>
            </div>
            
            <div className="input-group mb-3">
                <label className="input-group-text" name="inputGroupSelect02" >Estado do Livro</label>
                 <select className="form-select" id="inputGroupSelect02">
                    <option selected>Novo</option>
                    <option value="1">Usado</option>
                    <option value="2">Danificado</option>
                   
                </select>
            </div>
            <div className="row g-3">
            <div className="mb-3 col-sm-3">
             <label className="form-label"> Nº do tombo</label>
                        <input type="text" placeholder="IBSN" className="form-control" id="nome" required></input>
                        <div className="invalid-feedback"> Por favor, digite o Nº do tombo da obra.
                        </div>     
             </div>
             <div className="mb-3 col-sm-3">
             <label className="form-label"> Data de Cadastro</label>
                        <input type="date" className="form-control" id="nome" required></input>
                        <div className="invalid-feedback"> Por favor, digite a data de cadastro da obra.
                        </div>     
             </div>
           
            <div className="mb-3 col-sm-6">
                 <label id="exampleFormControlTextarea1" className="form-label"> Observações</label>
                 <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            </div>
            <button type="button"  className="btn btn-success m-2"><i className="bi bi-check-lg"> Cadastrar</i></button> 
            
            <button type="button" className="btn btn-secondary"> Cancelar</button> 
         </div>
        </div>
        <div className='row lista'>
        <div className="card">
            <h5 className="card-header"> Lista de Livros Cadastrados </h5>
            <div className="card-body">
                 <table className="table">

                    <thead>
                        <tr>
      <th scope="col">Título</th>
      <th scope="col">Autor</th>
      <th scope="col">Editora</th>
      <th scope="col">Ano</th>
      <th scope="col">ISBN</th>
      <th scope="col">Número de Páginas</th>
      <th scope="col">Gênero</th>
      <th scope="col">Estado do Livro</th>
      <th scope="col">Tombo</th>
      <th scope="col">Data de Cadastro</th>
      <th scope="col">Observações</th>
      <th scope="col">Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>
     <button type='button' className='btn btn-primary m-2'>Editar</button>
      <button type='button' className='btn btn-danger'>Excluir</button>
      </td>
    </tr>
  </tbody>
</table>
        </div>
        </div>
        </div>
    
        </form>
      
    )
}

export default FormLivros