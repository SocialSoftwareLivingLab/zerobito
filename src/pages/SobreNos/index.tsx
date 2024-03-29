import React from 'react';
import Menu from '../../components/BarraNavegacao';
import './style.css';

function SobreNos() {
    return (
        <div className="SobreNos">
            <Menu />
            Sobre Nós
            <p>
                O ZerÓbito é um site que tem como objetivo informar a população sobre o número de
                óbitos causados pelo COVID-19 no Brasil e no mundo.
            </p>
            <p>
                O site foi desenvolvido por alunos do curso de Engenharia de Software da
                Universidade de Brasília (UnB), como projeto para a disciplina de Introdução à
                Engenharia de Software (IEES).
            </p>
            <p>O ZerÓbito é um projeto de código aberto, disponível no GitHub.</p>
        </div>
    );
}

export default SobreNos;
