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
                <select
                    name='vinculo'
                    placeholder='Vínculo'
                >   
                    <option value="" >Vínculo</option>
                    <option value="">CLT</option>
                    <option value="">PJ</option>
                    <option value="">Estagiário</option>
                    <option value="">Aprendiz</option>
                    <option value="">Temporário</option>
                    <option value="">Terceirizado</option>
                    <option value="">Outro</option>
                </select>
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