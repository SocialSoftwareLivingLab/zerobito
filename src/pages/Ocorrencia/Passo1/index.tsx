import React, { useState, useRef } from 'react';
import useOcorrenciaViewModel from '../view.model';


const PassoUm = () => {

    const {
        estado,
        cidade,
        local,
        referenciaLocalidade,
        data,
        handleChangeCidade,
        handleChangeEstado,
        handleChangeLocal,
        handleChangeReferenciaLocalidade,
        handleChangeData,
    } = useOcorrenciaViewModel();

    return (
        <div>
            <h1>Informação sobre o acidente:</h1>
                <input
                    type="text"
                    name='estado'
                    value={estado}
                    onChange={handleChangeEstado}
                    placeholder='E stado'
                />
                <input
                    type="text"
                    name='cidade'
                    value={cidade}
                    onChange={handleChangeCidade}
                    placeholder='Cidade'
                />
                <input
                    type="text"
                    name='local'
                    value={local}
                    onChange={handleChangeLocal}
                    placeholder='Onde foi o acidente?'
                />
                <input
                    type="text"
                    name='referenciaLocalidade'
                    value={referenciaLocalidade}
                    onChange={handleChangeReferenciaLocalidade}
                    placeholder='Referência do local'
                />
                <input
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    name='data'
                    value={data}
                    onChange={handleChangeData}
                    placeholder='Data do acidente'
                />     
        </div>
    );
};


export default PassoUm;