import React from 'react';
import Menu from '../../components/Menu';
import './style.css';


const Home = () =>{
  return (
    <div className='header'>
      <Menu />
      <div className="grid">
        <div className="grid__item">
          <div className="grid__item__content">
            Seja Bem vindo ao ZerObito
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;