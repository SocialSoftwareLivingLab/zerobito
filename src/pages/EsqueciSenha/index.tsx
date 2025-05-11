import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import LoginCard from '../../components/Login';
import EsqueciSenhaCard from '../../components/EsqueciSenha';

const EsqueciSenhaView: React.FC = () => {
    return (
        <div>
            <div className="container-principal">
                <EsqueciSenhaCard />
                <div className="text-login">
                    Fazer Login, <Link to="../login">clique aqui</Link>
                </div>
            </div>
        </div>
    );
};

export default EsqueciSenhaView;
