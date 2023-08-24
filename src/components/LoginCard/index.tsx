import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import './style.css';

const LoginCard = () => {

    const { authenticated, login} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit', {email, password}); 

        login(email, password);
    };

    return (
        <div className="LoginCard">
            <div className="container">
                <div className="header-card">
                    ENTRAR 
                    <p>{String(authenticated)}</p>
                </div>
                <div className="body-card">
                    <form className="form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginCard;