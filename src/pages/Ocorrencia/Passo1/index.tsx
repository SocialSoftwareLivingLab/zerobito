import React from 'react';

const PassoUm = ({
    handleChangeEstado,
    handleChangeCidade,
    handleChangeLocal,
    handleChangeReferenciaLocalidade,
    handleChangeData,
    estado,
    cidade,
    local,
    referenciaLocalidade,
    data
}) => {
    const todosCamposPreenchidos = () => {
        return estado && cidade && local;
    };

    return (
        <div>
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
            {todosCamposPreenchidos() && (
                <input
                    type="text"
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => (e.target.type = 'text')}
                    name="data"
                    value={data}
                    onChange={(e) => handleChangeData(e.target.value)}
                    placeholder="Data do acidente"
                    required
                />
            )}
        </div>
    );
};

export default PassoUm;
