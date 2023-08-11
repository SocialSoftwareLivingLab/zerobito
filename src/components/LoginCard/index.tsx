import './style.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.post('http://seu-backend.com/login', {
                email,
                password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="LoginCard">
            <div className="container">
                <div className="header-card">
                    ENTRAR
                </div>
                <div className="body-card">
                    <form onSubmit={handleSubmit}>
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