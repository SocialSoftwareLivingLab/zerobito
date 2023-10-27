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
                            <li>
                                <Link to="/painel">Painel de Controle</Link>
                            </li>
                            <ul>
                                <li>
                                    <Link to="/profile">Perfil</Link>
                                </li>
                                <li>
                                    <Link to="/logout" onClick={removeData}>Sair</Link>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/sobre">Sobre nós</Link>
                            </li><li>
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