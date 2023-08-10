import './style.css';
import React, { useState } from 'react';


function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Lógica para autenticar o usuário com o email e senha
      console.log('Email:', email);
      console.log('Senha:', password);
    };

    return (
      <div className="LoginCard">
            <div class="container">
              <div class="header-card">
                ENTRAR
              </div>
              <div class="body-card">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <button type="submit">Entrar</button>
                </form> 
              </div>
            </div>
        </div>
    );
  };
  
export default LoginCard;