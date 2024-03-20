import React from 'react';
import "./style.css";

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
                placeholder="Nome da Empresa Empregadora"
                required
            />
            <input
                type="text"
                name="tomadoraDeServicoNome"
                value={tomadoraDeServicoNome}
                onChange={(e) => handleChangeTomadoraDeServicoNome(e.target.value)}
                placeholder="Nome da tomadora de serviço"
                required
            />
        </div>
    );
};

export default Vitima;