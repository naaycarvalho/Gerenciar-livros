import { Container, Image } from "react-bootstrap";
import livrosImg from "../assets/img/livros.jpg";
import "./home.css";
function Home() {
        return (
            <>
            
            <h2 className="text-center">Bem-vindo ao Sistema!</h2>
          
<Container className="d-flex justify-content-center align-items-center my-4">
<Image 
    src={livrosImg} 
    alt="Livros" 
    fluid // Para a imagem ser responsiva
    rounded // Estiliza a imagem com bordas arredondadas
    className="livros-img"
/>
</Container>
            </>
           

        )
        
       

    }
    
    export default Home;