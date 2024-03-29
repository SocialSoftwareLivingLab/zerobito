import React from 'react';
import Menu from '../../components/BarraNavegacao/index.tsx';
import TabelaContatos from '../../components/Tabelas/TabelaContatos/index.tsx';
import './style.css';

function Contato() {
    return (
        <div className="Contato">
            <Menu />
            <div className="container-body-contato">
                <div className="container-contato">
                    <div className="body-card-contato">
                        <TabelaContatos />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contato;
