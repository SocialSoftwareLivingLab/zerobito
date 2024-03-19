import React from 'react';
import "./style.css";

function Localidade({handleChangeEstado,
    handleChangeCidade,
    handleChangeLocal,
    handleChangeReferenciaLocalidade,
    estado,
    cidade,
    local,
    referenciaLocalidade,
    }){

    const todosCamposPreenchidos = () => {
        return estado && cidade && local;
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
                value={local}
                onChange={(e) => handleChangeLocal(e.target.value)}
                placeholder="Onde foi o acidente?"
                required
            />
            <input
                type="text"
                name="referenciaLocalidade"
                value={referenciaLocalidade}
                onChange={(e) => handleChangeReferenciaLocalidade(e.target.value)}
                placeholder="Referência do local"
            />
        </div>
    );
};

export default Localidade;