import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const [usuario, setusuario] = useState('');
    const [senha, setsenha] = useState('');
    const [error, seterror] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             await login({ usuario, senha });
             navigate('/');
           
        } catch (error) {
            seterror(error.message);
        }
}

    return (
    <div className=" container mt-5">
        <div className="row justify-content-center mb-5">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                    <h1 className='mb-4 display-4 fw-bolder'>
                    <span >Control</span>
                    <span >Books</span>
                </h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="usuario" className="form-label ">Usuário</label>
                                <input type="text" 
                                className="form-control "
                                id="usuario"
                                value={usuario}
                                onChange={(e) => setusuario(e.target.value)} 
                                />  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="senha" className="form-label">Senha</label>
                                    <input type="password" 
                                    className="form-control"
                                    id="senha"
                                    value={senha}
                                    onChange={(e) => setsenha(e.target.value)} 
                                    /> 
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Entrar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default Login