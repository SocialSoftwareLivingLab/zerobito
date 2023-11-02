import React, { useState } from 'react';
import useOcorrenciaViewModel from '../view.model';


const PassoQuatro = () => {
    const {
        condicaoAcidentado,
        handleChangeCondicaoAcidentado
    } = useOcorrenciaViewModel();

    return (
        <div>
            <h1>Qual a condição do Acidentado:</h1>

            <select
                id='condicaoAcidentado'
                value={condicaoAcidentado}
                name='condicaoAcidentado'
                onChange={handleChangeCondicaoAcidentado}
            >
                <option value="Obito">Com Óbito</option>
                <option value="Sem Obito">Sem Óbito</option>
            </select>
        </div>
    );
};

export default PassoQuatro;