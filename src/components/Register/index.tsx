import './style.css';
import React from 'react';
import useRegisterViewModel from './view.model';

function SignupCard() {
    const {
        nome,
        email,
        senha,
        senhaValidation,
        error,
        handleSubmit,
        handleChangeNome,
        handleChangeEmail,
        handleChangeSenha,
        handleChangeSenhaValidation
    } = useRegisterViewModel();

    return (
        <div className="SingupCard">
            <div className="container-body-register">
                <div className="container-register">
                    <h1 className="header-card-register">CADASTRO</h1>

                    <div className="body-card">
                        <form className="form" onSubmit={handleSubmit}>
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

                            {!!error && <p className="error_register">{error}</p>}

                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupCard;
