import './style.css';
import React from 'react';
import useRegisterViewModel from './view.model';
import { PulseLoader } from 'react-spinners';
import { FiAlertCircle } from 'react-icons/fi';

function SignupCard() {
    const {
        nome,
        email,
        senha,
        senhaValidation,
        error,
        loading,
        override,
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

                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupCard;
