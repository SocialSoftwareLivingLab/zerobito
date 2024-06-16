import React from 'react';
import { PulseLoader } from 'react-spinners';
import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';
import useQuerySearch from '../../hooks/use-query-search.hook';
import './style.css';
import useLoginViewModel from './view.model';
import { Navigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';

const LoginCard = () => {
    const {
        email,
        senha,
        error,
        loading,
        override,
        showPassword,
        handleSubmit,
        handleChangeEmail,
        handleChangeSenha,
        toggleShowPassword
    } = useLoginViewModel();

    const { isAutenticado } = useUsuarioAutenticado();

    const redirectTo = useQuerySearch({ queryName: 'redirectTo', defaultValue: '/' });

    if (isAutenticado) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <div className="LoginCard">
            <div className="container-body">
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
                                    type={showPassword ? 'text' : 'password'}
                                    name="senha"
                                    value={senha}
                                    onChange={handleChangeSenha}
                                    required
                                />
                                <span
                                    onClick={toggleShowPassword}
                                    style={{
                                        overflow: 'visible',
                                        marginLeft: '-3em',
                                        marginRight: '2em'
                                    }}>
                                    <AiOutlineEye style={{ verticalAlign: 'middle' }} />
                                </span>
                            </div>

                            <PulseLoader
                                color={'#134780'}
                                loading={loading}
                                cssOverride={override}
                                size={10}
                                speedMultiplier={0.6}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />

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
