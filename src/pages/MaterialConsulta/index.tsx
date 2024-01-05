import React from 'react';
import Menu from "../../components/Menu/index.tsx";
import "./style.css";

function Material(){
    return(
        <div className="Contato">
            <Menu />
            <div className="container-body-contato">
                <div className="container-contato">
                    <div className="body-card-contato">
                        Material para Casos
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Material;