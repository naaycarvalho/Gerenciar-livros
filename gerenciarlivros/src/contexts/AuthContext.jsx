import { createContext, useContext, useState, useEffect } from "react";
import { fetchBase } from "../api/api";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [perfil, setPerfil] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

   if(!token){
    setIsAuthenticated(false);
    setPerfil("");
    setUserName("");
    return false;
   }

  
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isValid = Date.now() < payload.exp * 1000;
        

        if (isValid) {
          setIsAuthenticated(true);
        
          setUserName(payload.usuario || "Usuário");
          setPerfil((payload.perfil || "").toLowerCase());

          return true;
        }
        else{
          logout();
          return false;

        }
      } catch (error) {
        console.log("erro", error);
        console.error("Erro ao verificar autenticação:", error);
        logout();
        return false;
      }
    
  };

  const login = async (credentials) => {


    const response = await fetchBase('/autenticacao/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (response.token) {
        localStorage.setItem('token', response.token);
        const payload = JSON.parse(atob(response.token.split(".")[1]));
  
        setIsAuthenticated(true);
        setUserName(payload.usuario || credentials.usuario);
        setPerfil((payload.perfil || "").toLowerCase());

        return response;

      }else{
        throw new Error("Nenhum token recebido");

      }
  
  }

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserName("");
    setPerfil("");
  }


return  (
    <AuthContext.Provider value={{isAuthenticated,userName,perfil,login,logout,checkAuth}}>
        {children}
    </AuthContext.Provider>
)



};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useAuth=()=>useContext(AuthContext)