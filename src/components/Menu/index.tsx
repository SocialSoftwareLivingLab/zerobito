import './style.css';
import React from 'react';
import { BsBookmarkFill } from "react-icons/bs";
import { FaUniversity, FaMicrophone } from "react-icons/fa";
import { BiSolidHelpCircle } from "react-icons/bi";
import { removeData } from '../../common/models/user/auth';
import { Link } from 'react-router-dom';

function Menu(): React.JSX.Element {
    const token = localStorage.getItem('token');
    const nome = localStorage.getItem('nome');
    const role = localStorage.getItem('role');

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
                                {role === "ADMIN" && (
                                    <li>
                                        <Link to="/painel">Painel de Controle</Link>
                                    </li>
                                )}
                                <li>
                                    <span className="icon"><BsBookmarkFill /></span>
                                    <Link to="/biblioteca">Biblioteca de Casos</Link>
                                </li>
                                <li>
                                    <span className="icon"><FaUniversity /></span>
                                    <Link to="/material">Material para Consulta</Link>
                                </li>
                                <li>
                                    <span className="icon"><FaMicrophone /></span>
                                    <Link to="/imprensa">Imprensa</Link>
                                </li>
                                <li>
                                    <span className="icon-help"><BiSolidHelpCircle /></span>
                                    <Link to="/ajuda">Ajuda</Link>
                                </li>
                                <li>
                                    <Link to="/perfil">Perfil</Link>
                                </li>
                                <span>Função</span>
                            </ul>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Menu;