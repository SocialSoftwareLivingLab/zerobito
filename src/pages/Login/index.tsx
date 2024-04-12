import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import LoginCard from '../../components/Login';

const LoginView: React.FC = () => {
    return (
        <div>
            <div className="container-principal">
                <LoginCard />
                <div className="text-login">
                    Caso não tenha um login, <Link to="../cadastro">clique aqui</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
