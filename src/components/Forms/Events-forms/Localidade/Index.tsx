import React from 'react';
import "./style.css";

function Localidade({handleChangeEstado,
    handleChangeCidade,
    handleChangeLogradouro,
    estado,
    cidade,
    logradouro,
    }){

    const todosCamposPreenchidos = () => {
        return estado && cidade && logradouro;
    };

    return (
        <div className='form-container'>
            <h1>Informação sobre o acidente:</h1>
            <input
                type="text"
                name="estado"
                value={estado}
                onChange={(e) => handleChangeEstado(e.target.value)}
                placeholder="Estado"
                required
            />
            <input
                type="text"
                name="cidade"
                value={cidade}
                onChange={(e) => handleChangeCidade(e.target.value)}
                placeholder="Cidade"
                required
            />
            <input
                type="text"
                name="local"
                value={logradouro}
                onChange={(e) => handleChangeLogradouro(e.target.value)}
                placeholder="Logradouro"
                required
            />
        </div>
    );
};

export default Localidade;