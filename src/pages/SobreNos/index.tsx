import React from "react";
import Menu from "../../components/Menu/index.tsx";
import "./style.css";

function SobreNos(): React.JSX.Element{
    return(
        <div className="SobreNos">
            <Menu/>
            <div className="container">
                <div className="header-card">
                    Sobre Nós
                </div>
                <div className="body-card">
                    <p>
                        O ZerÓbito é um site que tem como objetivo informar a população sobre o número de óbitos causados pelo COVID-19 no Brasil e no mundo.
                    </p>
                    <p>
                        O site foi desenvolvido por alunos do curso de Engenharia de Software da Universidade de Brasília (UnB), como projeto para a disciplina de Introdução à Engenharia de Software (IEES).
                    </p>
                    <p>
                        O ZerÓbito é um projeto de código aberto, disponível no GitHub.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SobreNos;
