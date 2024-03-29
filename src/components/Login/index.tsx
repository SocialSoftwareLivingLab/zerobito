import React from 'react';
import './style.css';
import useLoginViewModel from './view.model';

const LoginCard = () => {
    const { email, senha, error, handleSubmit, handleChangeEmail, handleChangeSenha } =
        useLoginViewModel();

    return (
        <div className="LoginCard">
            <body className="container-body">
                <div className="container">
                    <h1 className="header-card">ENTRAR</h1>

                    <div className="content">
                        <form className="form" onSubmit={handleSubmit}>
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

                            {!!error && <p className="error_login">{error}</p>}

                            <button type="submit">Entrar</button>
                        </form>
                    </div>
                </div>
            </body>
        </div>
    );
};

export default LoginCard;
