// faça uma pagina em react para pegar as informações do usuario e apresentar
import React from 'react';
import './style.css';
import Menu from "../../components/Menu";

const LoginView: React.FC = () => {
    return(
      <div>
        <Menu />

        <p>Esta é a pagina de perfil de usuario</p>            
      </div>
    );
  };
  
  export default LoginView;