import './style.css'
import React from 'react';
import useRegisterViewModel from './view.model';

function SignupCard() {
  const { nome, email, senha, senhaValidation, handleSubmit, handleChangeNome, handleChangeEmail, handleChangeSenha, handleChangeSenhaValidation } = useRegisterViewModel();

  return (
    <div className="SingupCard">
      <div className='container-body-register'>
        <div className="container-register">
          <div className="header-card-register">
            CADASTRO
          </div>
          <div className="body-card">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Nome:</label>
                <input
                  name="nome"
                  value={nome}
                  onChange={handleChangeNome}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChangeEmail}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  name="senha"
                  value={senha}
                  onChange={handleChangeSenha}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Confirmar Senha:</label>
                <input
                  type="password"
                  name="senhaValidation"
                  value={senhaValidation}
                  onChange={handleChangeSenhaValidation}
                  required
                />
              </div>
              <button type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupCard;
