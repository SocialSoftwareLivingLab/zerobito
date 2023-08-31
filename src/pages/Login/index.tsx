import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Menu from "../../components/Menu";
import LoginCard from '../../components/Login';

const LoginView: React.FC = () => {
  return(
    <div>
      <Menu />
      <LoginCard/>
      Caso não tenha um login, <Link to="../cadastro">Clique Aqui</Link>
    </div>
  );
};

export default LoginView;