import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Menu from "../../components/Menu";
import LoginCard from '../../components/Login';

const LoginView: React.FC = () => {
  return (
    <div>
      <Menu />
      <div className='container-principal'>
        <LoginCard />
        <div className="text-login">
          Caso não tenha um login, testando upload, <Link to="../cadastro">Clique Aqui</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginView;