import React from 'react';
import Menu from '../../components/BarraNavegacao';

import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';

const Perfil: React.FC = () => {
    const { logout, data } = useUsuarioAutenticado();

    const funcaoLogout = () => {
        logout();
    };

    return (
        <div>
            <Menu />
            <h1>Perfil</h1>
            <div>
                <p>Nome: {data.nome}</p>
                <p>Email: {data.email}</p>
                {/* Add more user information here */}
            </div>

            <a href="#" onClick={funcaoLogout}>
                Sair do App
            </a>
        </div>
    );
};

export default Perfil;
