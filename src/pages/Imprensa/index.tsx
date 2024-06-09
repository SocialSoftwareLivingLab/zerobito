import React from 'react';
import Header from '../../components/Page-Header';
import './style.css';

const Imprensa = () => {
    return (
        <div>
            <Header
                titulo="Imprensa"
                explicacao="Página destinada a imprensa, com informações sobre o projeto e contato para entrevistas."
            />
            <span>Imprensa</span>
        </div>
    );
};

export default Imprensa;
