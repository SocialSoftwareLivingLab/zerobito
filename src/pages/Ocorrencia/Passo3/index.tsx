import React, { useState } from 'react';
import useOcorrenciaViewModel from '../view.model';


const PassoTres = () => {
    const {
        tipoOcorrencia,
        nomeContato,
        emailContato,
        telefoneContato,
        handleChangeTipoOcorrencia,
        handleChangeNomeContato,
        handleChangeEmailContato,
        handleChangeTelefoneContato,
    } = useOcorrenciaViewModel();

    const isDisabled = tipoOcorrencia === 'Anonimo';

    return (
        <div>
            <h1>Informação sobre os Fontes de informações:</h1>

            <select
                id='tipoOcorrencia'
                value={tipoOcorrencia}
                name='tipoOcorrencia'
            >
                <option value="Anonimo">Anonimo</option>
                <option value="Sim">Sim</option>
            </select>
            <input
                type="text"
                name='nomeContato'
                value={nomeContato}
                onChange={handleChangeNomeContato}
                placeholder='Nome'
                disabled={isDisabled}
            />
            <input
                type="email"
                name='emailContato'
                value={emailContato}
                onChange={handleChangeEmailContato}
                placeholder='E-mail'
                disabled={isDisabled}
            />
            <input
                type="text"
                name='telefoneContato'
                value={telefoneContato}
                onChange={handleChangeTelefoneContato}
                placeholder='Telefone / Celular'
                disabled={isDisabled}
            />
        </div>
    );
};

export default PassoTres;