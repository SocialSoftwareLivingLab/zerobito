import React, { useState } from 'react';
import useOcorrenciaViewModel from '../view.model';

const PassoDois = () => {
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
                    className='form-container-input'
                    type="text"
                    name='nomeVitima'
                    value={nomeVitima}
                    onChange={handleChangeNomeVitima}
                    placeholder='Nome da vítima'
                />
                <input
                    className='form-container-input'
                    type="text"
                    name='empresaEmpregadora'
                    value={empresaEmpregadora}
                    onChange={handleChangeEmpresaEmpregadora}
                    placeholder='Empresa empregadora'
                />
                <input
                    className='form-container-input'   
                    type="enum"
                    name='vinculo'
                    value={vinculo}
                    onChange={handleChangeVinculo}
                    placeholder='Vínculo'
                />
                <textarea
                    name='descricao'
                    className='form-container-textarea'
                    value={descricao}
                    onChange={handleChangeDescricao}
                    placeholder='Digite algo...'
                />
        </div>
    );
};

export default PassoDois;