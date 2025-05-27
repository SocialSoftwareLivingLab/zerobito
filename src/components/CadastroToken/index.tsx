import './style.css';
import React from 'react';
import { PulseLoader } from 'react-spinners';
import { FiAlertCircle } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import useCadastroTokenViewModel from './view.model';

function SignupTokenCard() {
    const {
        nome,
        senha,
        senhaValidation,
        error,
        loading,
        override,
        showPassword,
        showConfirmPassword,
        email,
        handleSubmit,
        handleChangeNome,
        handleChangeSenha,
        handleChangeSenhaValidation,
        toggleShowPassword,
        toggleShowConfirmPassword
    } = useCadastroTokenViewModel();

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

                            <div>
                                <label htmlFor="password">Confirmar Senha:</label>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="senhaValidation"
                                    value={senhaValidation}
                                    onChange={handleChangeSenhaValidation}
                                    required
                                />
                                <span
                                    onClick={toggleShowConfirmPassword}
                                    style={{
                                        overflow: 'visible',
                                        marginLeft: '-3em',
                                        marginRight: '2em'
                                    }}>
                                    <AiOutlineEye style={{ verticalAlign: 'middle' }} />
                                </span>
                            </div>

                            <div
                                style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    color: '#333'
                                }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>
                                    Nota:
                                </strong>
                                <span>
                                    O e-mail utilizado será o mesmo do convite:{' '}
                                    <strong>{email}</strong>
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

                            {!!error && <p className="error_register">{error}</p>}

                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupTokenCard;
