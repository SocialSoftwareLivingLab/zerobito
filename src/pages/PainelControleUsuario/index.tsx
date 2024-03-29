import React from 'react';
import Menu from '../../components/BarraNavegacao';
import TabelaUsuarios from '../../components/Tabelas/TabelaUsuarios';
import usePainelViewModel from './view.model';
import './style.css';

const PainelControle = () => {
    const { usuarios } = usePainelViewModel();
    return (
        <div>
            <Menu />
            <div className="container-header">
                <h1>Painel de Controle de Usuarios</h1>
                <div className="text">
                    Aqui o administrador do sistema pode gerenciar os usuarios, dando para eles
                    cargos e permissões assim como inativar usuarios.
                </div>
            </div>
            <TabelaUsuarios usuarios={usuarios} />
        </div>
    );
};

export default PainelControle;
