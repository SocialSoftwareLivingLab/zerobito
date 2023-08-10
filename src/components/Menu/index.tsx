import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Menu(): React.JSX.Element {
    return (
        <div className="Menu">
            <nav className="menu">
                <ul>
                    <li>
                        <span className="Zer">Zer</span><span className="Obito">Óbito</span>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/cadastro">Cadastrar-se</Link>
                    </li>
                    <li>
                        <Link to="/sobre">Sobre nós</Link>
                    </li>
                    <li>
                        <Link to="/contato">Contato</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;