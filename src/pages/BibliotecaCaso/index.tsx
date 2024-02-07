import React from 'react';
import Menu from "../../components/Menu/index.tsx";
import "./style.css";

function BibliotecaCasos(){
    return(
        <div className="Contato">
            <Menu />
            <div className="container-header">
                <h1>Biblioteca de Casos</h1>
                <div className="container-contato">
                    <div className='text'>
                        Aqui o VISITANTE EXTERNO consulta os casos disponíveis na biblioteca
                    </div>
                </div>
            </div>
            <div className='search-container'>
            <input type="text" value="digite alguma coisa"/>
            </div>
        </div>
    );
};

export default BibliotecaCasos;