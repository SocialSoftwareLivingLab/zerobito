import React from 'react';
import { PulseLoader } from 'react-spinners';
import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';
import useQuerySearch from '../../hooks/use-query-search.hook';
import './style.css';
import { Navigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import useEsqueciSenhaViewModel from './view.model';

const EsqueciSenhaCard = () => {
    const { email, error, loading, override, handleSubmit, handleChangeEmail } =
        useEsqueciSenhaViewModel();

    return (
        <div className="LoginCard">
            <div className="container-body">
                <div className="container-redefinir">
                    <h1 className="header-card">Enviar e-mail de recuperação</h1>

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

                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EsqueciSenhaCard;
