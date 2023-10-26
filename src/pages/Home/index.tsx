import React from 'react';
import Menu from '../../components/Menu';
import './style.css';

const Home = () => {
  return (
    <div>
      <Menu />
      <div className='body'>
        <div className='body-text'>
          <h1>Seja bem vindo ao nosso site!</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;