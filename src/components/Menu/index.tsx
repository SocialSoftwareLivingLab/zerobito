import './style.css';
import React from 'react';
import { removeData } from '../../common/models/user/auth';
import { Link } from 'react-router-dom';

function Menu(): React.JSX.Element {
    const token = localStorage.getItem('token');
    return (
        <div className="Menu">
            <nav className="menu">
                <ul>
                    <li>
                        <Link to="/">
                            <span className="Zer">Zer</span><span className="Obito">Óbito</span>
                        </Link>
                    </li>
                    {!!token ? (
                        <>
                            <ul>
                                <li>
                                    <Link to="/painel">Painel de Controle</Link>
                                </li>
                                <li>
                                    <Link to="/biblioteca">Biblioteca de Casos</Link>
                                </li>
                                <li>
                                    <Link to="/material">Material para Consulta</Link>
                                </li>
                                <li>
                                    <Link to="/imprensa">Imprensa</Link>
                                </li>
                                <li>
                                    <Link to="/ajuda">Ajuda</Link>
                                </li>
                                <li>
                                    <Link to="/profile">Perfil</Link>
                                </li>
                            </ul>
                            <button className='button-exit'>
                                <a onClick={removeData}>Sair</a>
                            </button>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/sobre">Sobre nós</Link>
                            </li>
                            <li>
                                <Link to="/contato">Contato</Link>
                            </li>
                            <ul className='LoginButton'>
                                <button className="button">
                                    <Link to="/login">
                                        Entrar
                                    </Link>
                                </button>
                            </ul>
                        </>
                    )}
                </ul>

            </nav>
        </div>
    );
}

export default Menu;