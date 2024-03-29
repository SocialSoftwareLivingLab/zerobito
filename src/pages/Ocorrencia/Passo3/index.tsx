import React from 'react';

const PassoTres = ({
    handleChangeTipoOcorrencia,
    handleChangeNomeContato,
    handleChangeEmailContato,
    handleChangeTelefoneContato,
    tipoOcorrencia,
    nomeContato,
    emailContato,
    telefoneContato
}) => {
    const isDisabled = tipoOcorrencia === 'Anônimo';

    return (
        <div>
            <h1>Informação do Denunciante:</h1>
            <select
                id="tipoOcorrencia"
                value={tipoOcorrencia}
                name="tipoOcorrencia"
                onChange={(e) => handleChangeTipoOcorrencia(e.target.value)}
            >
                <option value="Anônimo">Anônimo</option>
                <option value="Vítima">Vítima</option>
                <option value="Familiar">Familiar</option>
                <option value="Colega de Trabalho">Colega de Trabalho</option>
                <option value="Testemunha">Testemunha</option>
                <option value="Outros">Outros</option>
            </select>
            <input
                type="text"
                name="nomeContato"
                value={nomeContato}
                onChange={(e) => handleChangeNomeContato(e.target.value)}
                placeholder="Nome"
                disabled={isDisabled}
            />
            <input
                type="email"
                name="emailContato"
                value={emailContato}
                onChange={(e) => handleChangeEmailContato(e.target.value)}
                placeholder="E-mail"
                disabled={isDisabled}
            />
            <input
                type="text"
                name="telefoneContato"
                value={telefoneContato}
                onChange={(e) => handleChangeTelefoneContato(e.target.value)}
                placeholder="Telefone / Celular"
                disabled={isDisabled}
            />
        </div>
    );
};

export default PassoTres;
