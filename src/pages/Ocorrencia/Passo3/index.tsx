import React, { useState } from 'react';
import useOcorrenciaViewModel from '../view.model';


const PassoTres = () => {
    const {
        nomeVitima,
        empresaEmpregadora,
        vinculo,
        descricao,
        handleChangeNomeVitima,
        handleChangeEmpresaEmpregadora,
        handleChangeVinculo,
        handleChangeDescricao,
    } = useOcorrenciaViewModel();

    return (
        <div>
            <h1>Informaçõe sobre vitimas:</h1>
                <input
                    type="text"
                    name='nomeVitima'
                    value={nomeVitima}
                    onChange={handleChangeNomeVitima}
                    placeholder='Nome da vítima'
                />
                <input
                    type="text"
                    name='empresaEmpregadora'
                    value={empresaEmpregadora}
                    onChange={handleChangeEmpresaEmpregadora}
                    placeholder='Empresa empregadora'
                />
                <input
                    type="enum"
                    name='vinculo'
                    value={vinculo}
                    onChange={handleChangeVinculo}
                    placeholder='Vínculo'
                />
                <input
                    type="text"
                    name='descricao'
                    value={descricao}
                    onChange={handleChangeDescricao}
                    placeholder='Digite algo...'
                />
        </div>
    );
};

export default PassoTres;