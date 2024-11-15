import'./formlivros.css'
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

             <div className="mb-3">
             <label className="form-label"> Autor </label>
                        <input type="text" placeholder="Autor do Livro" className="form-control" id="nome" required></input>
                        <div className="invalid-feedback"> Por favor, digite o Autor completo.
                        </div>     
             </div>
             
            <div className="input-group mb-3">
                <label className="input-group-text" name="inputGroupSelect01" >Estado do Livro</label>
                 <select className="form-select" id="inputGroupSelect01">
                    <option selected>Novo</option>
                    <option value="1">Usado</option>
                    <option value="2">Danificado</option>
                   
                </select>
            </div>

         </div>
        </div>

        </form>
    )
}

export default FormLivros