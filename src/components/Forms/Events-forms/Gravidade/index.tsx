import React from 'react';
import "../style.css";

function Vitima({handleChangeObito,
    handleChangeGravidade,
    obito,
    gravidade
    }){


    return (
        <div className='form-container'>
            <h1>Informações sobre o acidente:</h1>
            <select
                name='obito'
                value={obito} // Defina o valor para o estado atual
                onChange={(e)=> handleChangeObito(e.target.value)} // Adicione o manipulador de evento onChange
                className='form-container-select' // Supondo que você tenha estilos para isto
            >
                <option value="Com Óbito">Com Óbito</option>
                <option value="Sem Óbito">Sem Óbito</option>
            </select>
            {obito === "Sem Óbito" && (
                <select
                name='gravidade'
                value={gravidade} // Defina o valor para o estado atual
                onChange={(e)=> handleChangeGravidade(e.target.value)} // Adicione o manipulador de evento onChange
                className='form-container-select' // Supondo que você tenha estilos para isto
            >
                <option value = ""disabled>Gravidade</option>
                <option value="Emergencial">Emergencial</option>
                <option value="Muito Urgente">Muito Grave</option>
                <option value="Urgência">Urgência</option>
                <option value="Pouca Urgência">Pouca Urgência</option>
            </select>
              
            )}

        </div>
    );
};

export default Vitima;