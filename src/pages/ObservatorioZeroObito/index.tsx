import React from 'react';
import Menu from '../../components/BarraNavegacao/index.tsx';
import './style.css';
import { useHistory } from 'react-router-dom';

function ObservatorioZeroObito() {
    const history = useHistory();

    const handleBibliotecaClick = () => {
        history.push('/biblioteca');
    };

    return (
        <div className="Contato">
            <Menu />
            <div className="container-header">
                <h1>Observatório ZerÓbito</h1>
                <div className="container-contato">
                    <div className="text">
                        Aqui o VISITANTE EXTERNO pode consultar dados consolidados
                    </div>
                </div>
            </div>
            <div className="search-container">
                <input type="text" value="digite alguma coisa" />
                <button className="search-container-pesquisar" type="submit">
                    Pesquisar
                </button>
                <button
                    className="search-container-biblioteca"
                    type="submit"
                    onClick={handleBibliotecaClick}>
                    Biblioteca de Casos
                </button>
            </div>
        </div>
    );
}

export default ObservatorioZeroObito;
