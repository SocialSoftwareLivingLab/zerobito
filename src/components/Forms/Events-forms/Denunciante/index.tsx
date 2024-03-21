import React from 'react';
import "../style.css";

function Denunciante({handleChangeTipoDenuncia,
    handleChangeNomeDenuncia,
    handleChangeEmailDenuncia,
    handleChangeTelefoneDenuncia,
    handleChangeEnderecoDenuncia,
    handleChangeDenunciaCustomizada,
    tipoDenuncia,
    nomeDenuncia,
    emailDenuncia,
    telefoneDenuncia,
    enderecoDenuncia,
    denunciaCustomizada
    }){
    
    const tiposPadroes = ["Anônimo", "Vítima", "Familiar", "Colega De Trabalho", "Sindicato", "Imprensa",
                        "Serviço de Saúde"]

    return (
        <div className='form-container'>
            <h1>Informações sobre o acidente:</h1>
            <select
                name='tipoDenuncia'
                value={tipoDenuncia} 
                onChange={(e)=> handleChangeTipoDenuncia(e.target.value)}
                className='form-container-select'
            >
                <option value="Anônimo">Denunciante Anônimo</option>
                <option value="Vítima">Vítima</option>
                <option value="Familiar">Familiar</option>
                <option value="Colega De Trabalho">Colega de Trabalho</option>
                <option value="Sindicato">Sindicato</option>
                <option value="Imprensa">Imprensa</option>
                <option value="Serviço de Saúde">Serviço de Saúde</option>
                <option value="Outro">Outro</option>
                
            </select>
            {!tiposPadroes.includes(denunciaCustomizada) && (
                <input
                type="text"
                name="denunciaCustomizada"
                value={denunciaCustomizada}
                onChange={(e) => {
                    const newValue = e.target.value;
                    handleChangeDenunciaCustomizada(newValue);
                    
                    if (tiposPadroes.includes(newValue)) {
                        handleChangeTipoDenuncia(newValue);
                    }
                }}

                placeholder="Escreva o tipo do Denunciante"
                required></input>
            )}
            {tipoDenuncia !== "Anônimo" && (
                <>
                <input
                type="text"
                name="nomeDenuncia"
                value={nomeDenuncia}
                onChange={(e) => handleChangeNomeDenuncia(e.target.value)}
                placeholder="Nome do Denunciante"
                required
                /> 
                <input
                type="text"
                name="emailDenuncia"
                value={emailDenuncia}
                onChange={(e) => handleChangeEmailDenuncia(e.target.value)}
                placeholder="E-mail do Denunciante"
                required
                /> 
                <input
                type="text"
                name="telefoneDenuncia"
                value={telefoneDenuncia}
                onChange={(e) => handleChangeTelefoneDenuncia(e.target.value)}
                placeholder="Telefone para contato do Denunciante"
                required
                /> 
                <input
                type="text"
                name="enderecoDenuncia"
                value={enderecoDenuncia}
                onChange={(e) => handleChangeEnderecoDenuncia(e.target.value)}
                placeholder="Endereço do Denunciante"
                required
                />
                </>
            )}


        </div>
    );
};

export default Denunciante;