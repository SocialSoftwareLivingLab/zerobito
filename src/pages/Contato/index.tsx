import React from 'react';
import Menu from "../../components/Menu/index.tsx";
import ContactList from '../../components/ContactList/index.tsx';
import "./style.css";

function Contato(){
    return(
        <div className="Contato">
            <Menu />
            <div className="container-body-contato">
                <div className="container-contato">
                    <div className="header-card-contato">
                        CONTATOS
                    </div>
                    <div className="body-card-contato">
                        <ContactList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contato;