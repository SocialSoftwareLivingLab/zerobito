import React from 'react';

const PassoQuatro = ({
    condicaoAcidentado,
    gravidade,
    handleChangeCondicaoAcidentado,
    handleChangeGravidade,
}) => {

    return (
        <div>
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
            {/* Se condicaoAcidentado for com obito a gravidade é automaticamente " " */}
            {condicaoAcidentado === 'Sem Obito' && (
                <div>
                    <h1>Qual a gravidade do acidente:</h1>
                    <select
                        id="gravidade"
                        value={gravidade}
                        name='gravidade'
                        onChange={(e) => handleChangeGravidade(e.target.value)}
                    >
                        <option value="Emergencial">Emergencial</option>
                        <option value="Muito Urgente">Muito Grave</option>
                        <option value="Urgencia">Urgencia</option>
                        <option value="Pouca Urgencia">Pouca Urgencia</option>
                    </select>
                </div>
            )
            }
        </div>
    );
};

export default PassoQuatro;