import './style.css'
import React from 'react';
import useSignupViewModel from './view.model';

function SignupCard() {
  const { nome, email, senha, setNome,setEmail, setSenha, onSubmit } = useSignupViewModel();
 
  return (
    <div className="SingupCard">
      <div className="container-register">
        <div className="header-card-register">
          CADASTRO
        </div>
        <div className="body-card">
          <form className='form'>
            <div>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                value={nome}
                onChange={(e)=>setNome(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <button type="submit" onClick={onSubmit}>Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupCard;
