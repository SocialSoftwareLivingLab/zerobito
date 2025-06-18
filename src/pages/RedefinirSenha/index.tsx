import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import EsqueciSenhaCard from '../../components/EsqueciSenha';
import RedefinirSenhaCard from '../../components/RedefinirSenha';

const RedefinirSenhaView: React.FC = () => {
    return (
        <div>
            <div className="container-principal">
                <RedefinirSenhaCard />
                <div className="text-login">
                    Fazer Login, <Link to="../login">clique aqui</Link>
                </div>
            </div>
        </div>
    );
};

export default RedefinirSenhaView;
