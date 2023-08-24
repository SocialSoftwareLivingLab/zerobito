import React, { useState, useEffect, useContext } from 'react';
import Menu from '../../components/Menu';

import { AuthContext } from '../../contexts/auth';

import { getUsers } from '../../services/api';

import './style.css';


const Home = () =>{
  const { authenticated, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   (async () => {
      const response = await getUsers();
      setUsers(response.data);
      setLoading(false);
   })();
  }, []);

  const handleLogout = () => {
    logout();
  }

  if(loading){
   return <div className="loading">Carregando dados...</div>
  }

  return (
    <div className='header'>
      <Menu />
      <div className="grid">
        <div className="grid__item">
          <div className="grid__item__content">
            Seja Bem vindo ao ZerObito
            <p>{String(authenticated)}</p>
            <button onClick={handleLogout}>Lougout</button>
            <ul>
              {users.map((user) => (
                <li>
                  {user._id} - {user.email} - {user.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;