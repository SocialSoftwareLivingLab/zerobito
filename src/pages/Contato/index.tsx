import React from 'react';
import Menu from "../../components/Menu/index.tsx";
import "./style.css";

function Contato(){
    return(
        <div className="Contato">
            <Menu/>
            <div className="">
                <div className="">
                    Contato
                </div>
                <div className="">
                    <p>
                        Nome:
                        <input type="text" name="nome" />
                    </p>
                    <p>
                        Email:
                        <input type="text" name="email" />
                    </p>
                    <p>
                        Mensagem:
                        <input type="text" name="mensagem" />
                    </p>
                    <p>
                        <button type="submit">Enviar</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contato;