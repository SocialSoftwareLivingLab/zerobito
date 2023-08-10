import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Menu from "../../components/Menu/index.tsx";
import LoginCard from '../../components/LoginCard/index.tsx';

function Login(): React.JSX.Element{
  return(
    <div>
      <Menu />
      <LoginCard />
      Caso não tenha um login, <Link to="../cadastro">Clique Aqui</Link>
    </div>
  );
};

export default Login;