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
                value={vinculo} // Defina o valor para o estado atual
                onChange={handleChangeVinculo} // Adicione o manipulador de evento onChange
                className='form-container-select' // Supondo que você tenha estilos para isto
            >
                <option value="" disabled>Vínculo</option>
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Estagiário">Estagiário</option>
                <option value="Aprendiz">Aprendiz</option>
                <option value="Temporário">Temporário</option>
                <option value="Terceirizado">Terceirizado</option>
                <option value="Outro">Outro</option>
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