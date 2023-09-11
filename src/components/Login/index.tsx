import React from 'react';
import './style.css';
import useLoginViewModel from './view.model';

const LoginCard = () => {

    const { email, password, error, handleSubmit, handleChange } = useLoginViewModel();

    return (
        <div className="LoginCard">
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
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Senha:</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" >Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginCard;