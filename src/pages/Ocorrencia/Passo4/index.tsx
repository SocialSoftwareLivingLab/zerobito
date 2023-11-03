import React from 'react';

const PassoQuatro = ({
    condicaoAcidentado,
    handleChangeCondicaoAcidentado
}) => {

    return (
        <div>
            <h1>Qual a condição do Acidentado:</h1>

            <select
                id='condicaoAcidentado'
                value={condicaoAcidentado}
                name='condicaoAcidentado'
                onChange={(e) => handleChangeCondicaoAcidentado(e.target.value)}
            >
                <option value="Obito">Com Óbito</option>
                <option value="Sem Obito">Sem Óbito</option>
            </select>
        </div>
    );
};

export default PassoQuatro;