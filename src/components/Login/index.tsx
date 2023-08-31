import React from 'react';
import './style.css';
import useLoginViewModel from './view.model';

const LoginCard = () => {

    const { email, password, setEmail, setPassword, isLoading, onSubmit } = useLoginViewModel();

    return (
        <div className="LoginCard">
            <div className="container">
                <div className="header-card">
                    ENTRAR
                </div>
                <div className="body-card">
                    <form className="form">
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Senha:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" onClick={onSubmit} disabled={isLoading}>Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginCard;