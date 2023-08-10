import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu/index.tsx';
import SignupCard from '../../components/RegisterCard/index.tsx';

function Login() {
  return (
    <div>
      <Menu />
      <SignupCard />
      Caso já tenha um login, <Link to="../login">Clique Aqui</Link>
    </div>
  );
}

export default Login;
