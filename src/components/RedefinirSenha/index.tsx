import React from 'react';
import { PulseLoader } from 'react-spinners';
import './style.css';
import { AiOutlineEye } from 'react-icons/ai';
import { FiAlertCircle } from 'react-icons/fi';
import useRedefinirSenhaViewModel from './view.model';

const RedefinirSenhaCard = () => {
    const {
        senha,
        senhaValidation,
        error,
        loading,
        override,
        showPassword,
        showConfirmPassword,
        handleSubmit,
        handleChangeSenha,
        handleChangeSenhaValidation,
        toggleShowPassword,
        toggleShowConfirmPassword
    } = useRedefinirSenhaViewModel();

    return (
        <div className="LoginCard">
            <div className="container-body">
                <div className="container-redefinir-senha">
                    <h1 className="header-card">Redefinir Senha</h1>

                    <div className="content">
                        <form className="form" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="password">
                                    <span style={{ marginLeft: '-1em' }}>
                                        <FiAlertCircle
                                            style={{
                                                verticalAlign: 'middle',
                                                marginRight: '5px',
                                                marginBottom: '2px',
                                                cursor: 'pointer'
                                            }}
                                            title={
                                                'Mínimo de 8 dígitos, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial'
                                            }
                                        />
                                    </span>
                                    Senha:
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="senha"
                                    value={senha}
                                    onChange={handleChangeSenha}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className="btn-toggle-password">
                                    <AiOutlineEye style={{ verticalAlign: 'middle' }} />
                                </button>
                            </div>

                            <div>
                                <label htmlFor="password">Confirmar Senha:</label>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="senhaValidation"
                                    value={senhaValidation}
                                    onChange={handleChangeSenhaValidation}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowConfirmPassword}
                                    className="btn-toggle-password">
                                    <AiOutlineEye style={{ verticalAlign: 'middle' }} />
                                </button>
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

                            {!!error && <p className="error_register">{error}</p>}

                            <button type="submit">Redefinir</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RedefinirSenhaCard;
