import React from 'react';

const PassoCinco = ({
    handleChangeGravidade,
    gravidade
}) => {

    return (
        <div>
            <h1>Indique a gravidade do caso:</h1>
            <div className='group-buttom-gravidade'>
                <button value="Emergencial" className='gravidade-button' onClick={(e) => handleChangeGravidade(e.target)}>
                    Emergencial
                </button>
                <button value="Muito Urgente" className='gravidade-button' onClick={(e) => handleChangeGravidade(e.target)}>
                    Muito urgente
                </button>
                <button value="Urgencia" className='gravidade-button' onClick={(e) => handleChangeGravidade(e.target)}>
                    Urgencia
                </button>
                <button value="Pouca Urgencia" className='gravidade-button' onClick={(e) => handleChangeGravidade(e.target)}>
                    Pouca urgencia
                </button>
            </div>
        </div>
    );
};

export default PassoCinco;