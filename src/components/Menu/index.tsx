import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Menu(): React.JSX.Element {
    return (
        <div className="Menu">
            <nav className="menu">
                <ul>
                    <li>
                        <Link to="/">
                            <span className="Zer">Zer</span><span className="Obito">Óbito</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/sobre">Sobre nós</Link>
                    </li>
                    <li>
                        <Link to="/contato">Contato</Link>
                    </li>
                    <li>
                        <Link to="/painel">Painel de Controle</Link>
                    </li>
                </ul>
                <ul className='LoginButton'>
                    <button className="button">
                        <Link to="/login">
                            Entrar
                        </Link>
                    </button>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;