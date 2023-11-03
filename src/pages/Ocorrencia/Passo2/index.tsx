import React from 'react';

const PassoDois = ({
    handleChangeNomeVitima,
    handleChangeEmpresaEmpregadora,
    handleChangeVinculo,
    handleChangeDescricao,
    nomeVitima,
    empresaEmpregadora,
    vinculo,
    descricao 
}) => {

    return (
        <div>
            <h1>Informaçõe sobre vitimas:</h1>
            <input
                className='form-container-input'
                type="text"
                name='nomeVitima'
                value={nomeVitima}
                onChange={(e) => handleChangeNomeVitima(e.target.value)}
                placeholder='Nome da vítima'
            />
            <input
                className='form-container-input'
                type="text"
                name='empresaEmpregadora'
                value={empresaEmpregadora}
                onChange={(e) => handleChangeEmpresaEmpregadora(e.target.value)}
                placeholder='Empresa empregadora'
            />
            <select
                name='vinculo'
                value={vinculo} // Defina o valor para o estado atual
                onChange={(e)=> handleChangeVinculo(e.target.value)} // Adicione o manipulador de evento onChange
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
                onChange={(e) => handleChangeDescricao(e.target.value)}
                placeholder='Descrição'
            />
        </div>
    );
};

export default PassoDois;