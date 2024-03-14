import React from 'react';
import Menu from '../../components/Menu';

import { removeData } from "../../common/models/user/auth"

const Perfil: React.FC = () => {
  const userName = localStorage.getItem('nome');
  const userEmail = localStorage.getItem('email');

  const funcaoLogout = () => {
    removeData();
  }

  return (
    <div>
      <Menu />
      <h1>Perfil</h1>
      <div>
        <p>Nome: {userName}</p>
        <p>Email: {userEmail}</p>
        {/* Add more user information here */}
      </div>

      <a href="#" onClick={funcaoLogout}>Sair do App</a>
    </div>
  );
};

export default Perfil;
