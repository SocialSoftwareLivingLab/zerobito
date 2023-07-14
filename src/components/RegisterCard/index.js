import './style.css'
import React, { useState } from 'react';

function SignupCard(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para registrar o usuário com os dados de cadastro
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Senha:', password);
    // Limpar os campos do formulário
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="SingupCard">
        <div class="container">
            <div class="header-card">
                Cadastro
            </div>
            <div class="body-card">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nome:</label>
                        <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                        />
                    </div>
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
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default SignupCard;
