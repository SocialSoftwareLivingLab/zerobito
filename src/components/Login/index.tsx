import React from 'react';
import './style.css';
import useLoginViewModel from './view.model';
import { PulseLoader } from 'react-spinners';

const LoginCard = () => {
    const {
        email,
        senha,
        error,
        loading,
        override,
        handleSubmit,
        handleChangeEmail,
        handleChangeSenha
    } = useLoginViewModel();

    return (
        <div className="LoginCard">
            <div className="container-body">
                <PulseLoader
                    color={'#134780'}
                    loading={loading}
                    cssOverride={override}
                    size={10}
                    speedMultiplier={0.6}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
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
            </div>
        </div>
    );
};

export default LoginCard;
