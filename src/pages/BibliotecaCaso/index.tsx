import React from 'react';
import Menu from "../../components/Menu/index.tsx";
import "./style.css";

function BibliotecaCasos(){
    return(
        <div className="Contato">
            <Menu />
            <div className="container-body-contato">
                <div className="container-contato">
                    <div className="body-card-contato">
                        Biblioteca de Casos
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BibliotecaCasos;