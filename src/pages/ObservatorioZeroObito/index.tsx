import React from 'react';
import './style.css';
import { redirect } from 'react-router-dom';

function ObservatorioZeroObito() {
    const handleBibliotecaClick = () => {
        redirect('/biblioteca');
    };

    return (
        <div className="Contato">
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
