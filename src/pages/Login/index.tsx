import React from 'react';
import './style.css';
import { Link, Navigate } from 'react-router-dom';
import LoginCard from '../../components/Login';
import useQuerySearch from '../../hooks/use-query-search.hook';

const LoginView: React.FC = () => {
    const redirectTo = useQuerySearch({ queryName: 'redirectTo', defaultValue: '/' });

    // Verifica se redirectTo começa com "/convite/" e extrai o token
    const isConvite = redirectTo.startsWith('/convites/');
    const token = isConvite ? redirectTo.split('/')[2] : null;

    return (
        <div>
            <div className="container-principal">
                <LoginCard />
                <div className="text-login">
                    {isConvite && token ? (
                        <>
                            Para se cadastrar com convite,{' '}
                            <Link to={`../cadastro-convite/${token}`}>clique aqui</Link>
                        </>
                    ) : (
                        <>
                            Caso não tenha um login, <Link to="../cadastro">clique aqui</Link>
                        </>
                    )}
                </div>
                <div className="text-login">
                    <Link to="../esqueci-minha-senha">Esqueci minha senha.</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
