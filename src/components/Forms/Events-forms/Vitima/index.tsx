import React from 'react';
import "../style.css";

function Vitima({handleChangeNome,
    handleChangeNomeEmpresa,
    handleChangeCNPJEmpresa,
    handleChangeTomadoraDeServicoNome,
    handleChangeTomadoraDeServicoCNPJ,
    handleChangeVinculoEmpresa,
    nome,
    nomeEmpresa,
    cnpjEmpresa,
    tomadoraDeServicoCNPJ,
    tomadoraDeServicoNome,
    vinculoEmpresa
    }){


    return (
        <div className='form-container'>
            <h1>Informações sobre o acidente:</h1>
            <input
                type="text"
                name="nome"
                value={nome}
                onChange={(e) => handleChangeNome(e.target.value)}
                placeholder="Nome"
                required
            />
            <input
                type="text"
                name="nomeEmpresa"
                value={nomeEmpresa}
                onChange={(e) => handleChangeNomeEmpresa(e.target.value)}
                placeholder="Nome da empresa empregadora"
                required
            />
            {nomeEmpresa && (
                <input
                type="text"
                name="cnpjEmpresa"
                value={cnpjEmpresa}
                onChange={(e) => handleChangeCNPJEmpresa(e.target.value)}
                placeholder="CNPJ da empresa empregadora"
                required
            />
              
            )}
            <input
                type="text"
                name="tomadoraDeServicoNome"
                value={tomadoraDeServicoNome}
                onChange={(e) => handleChangeTomadoraDeServicoNome(e.target.value)}
                placeholder="Nome da tomadora de serviço"
                required
            />
            {tomadoraDeServicoNome && (
                <input
                type="text"
                name="tomadoraDeServicoCNPJ"
                value={tomadoraDeServicoCNPJ}
                onChange={(e) => handleChangeTomadoraDeServicoCNPJ(e.target.value)}
                placeholder="CNPJ da tomadora de serviço"
                required
            /> 
            )}
            <select
                name='vinculo'
                value={vinculoEmpresa} // Defina o valor para o estado atual
                onChange={(e)=> handleChangeVinculoEmpresa(e.target.value)} // Adicione o manipulador de evento onChange
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
                <option value="Desconhecido">Desconhecido</option>
            </select>
        </div>
    );
};

export default Vitima;