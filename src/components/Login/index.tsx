import React from 'react';
import './style.css';
import useLoginViewModel from './view.model';

const LoginCard = () => {

    const { email, senha, error, handleSubmit, handleChangeEmail, handleChangeSenha } = useLoginViewModel();

    return (
        <div className="LoginCard">
            <div className='container-body'>
                <div className="container">
                    <div className="header-card">
                        ENTRAR
                    </div>
                    <div className="body-card">
                        <form className="form" onSubmit={handleSubmit}>
                            {!!error && <p>{error}</p>}
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
                            <button type="submit" >Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginCard;