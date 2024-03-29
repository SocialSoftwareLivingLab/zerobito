import './style.css';
import React from 'react';
import { BsBookmarkFill } from 'react-icons/bs';
import { FaUniversity, FaMicrophone, FaListUl } from 'react-icons/fa';
import { BiSolidHelpCircle } from 'react-icons/bi';
import { MdNotifications } from 'react-icons/md';
import { removeData } from '../../common/models/user/auth';
import { Link } from 'react-router-dom';

function Menu(): React.JSX.Element {
    const token = localStorage.getItem('token');
    const nome = localStorage.getItem('nome');
    const role = localStorage.getItem('role');
    const userProfilePic = localStorage.getItem('userProfilePic');

    return (
        <div className="Menu">
            <nav className="menu">
                <ul>
                    <li>
                        <Link to="/">
                            <span className="Zer">Zer</span>
                            <span className="Obito">Óbito</span>
                        </Link>
                    </li>
                    {token ? (
                        <>
                            <ul>
                                {role === 'ADMIN' && (
                                    <li>
                                        <Link to="/painel">Painel de Controle</Link>
                                    </li>
                                )}
                                <li>
                                    <Link to="/biblioteca">
                                        <span className="icon">
                                            <BsBookmarkFill />
                                        </span>
                                        Biblioteca de Casos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/material">
                                        <span>
                                            {' '}
                                            <FaUniversity className="icon" />{' '}
                                        </span>
                                        Material para Consulta
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/imprensa">
                                        <span className="icon">
                                            <FaMicrophone />
                                        </span>
                                        Imprensa
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/ajuda">
                                        <span className="icon-help">
                                            <BiSolidHelpCircle />
                                        </span>
                                        Ajuda
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/perfil">Perfil</Link>
                                </li>
                                <li>
                                    <span>Função</span>
                                </li>
                                <li>
                                    <button className="sair" onClick={removeData}>
                                        <span className="icon-button">
                                            {' '}
                                            <MdNotifications />{' '}
                                        </span>
                                    </button>
                                    <span className="icon-button">
                                        {' '}
                                        <FaListUl />{' '}
                                    </span>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <></>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Menu;
