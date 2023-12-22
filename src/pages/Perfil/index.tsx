import React from 'react';
import Menu from '../../components/Menu';

const Perfil: React.FC = () => {
  const userName = localStorage.getItem('nome');
  const userEmail = localStorage.getItem('email');

  return (
    <div>
      <Menu />
      <h1>Perfil</h1>
      <div>
        <p>Nome: {userName}</p>
        <p>Email: {userEmail}</p>
        {/* Add more user information here */}
      </div>
    </div>
  );
};

export default Perfil;
