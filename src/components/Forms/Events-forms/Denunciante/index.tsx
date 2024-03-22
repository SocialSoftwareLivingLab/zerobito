import React from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import "../style.css";

interface DenuncianteFormInput {
    tipo: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    customizado: string;
}

function Denunciante() {
    const { handleSubmit, register, control } = useForm<DenuncianteFormInput>();
    const tipoDenuncianteSelecionado = useWatch({ control, name: 'tipo' });

    const submitForm: SubmitHandler<DenuncianteFormInput> = (data) => {
        console.log(data);
    }

    return (
        <>
            <h1>Informações sobre o acidente</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit(submitForm)}>
                    <select
                        {...register('tipo')}
                        className='form-container-select'
                    >
                        <option value="ANONIMO">Denunciante Anônimo</option>
                        <option value="VITIMA">Vítima</option>
                        <option value="FAMILIAR">Familiar</option>
                        <option value="COLEGA_TRABALHO">Colega de Trabalho</option>
                        <option value="SINDICATO">Sindicato</option>
                        <option value="IMPRENSA">Imprensa</option>
                        <option value="SERVICO_SAUDE">Serviço de Saúde</option>
                        <option value="OUTRO">Outro</option>
                    </select>
                </form>

                {tipoDenuncianteSelecionado === 'OUTRO' && <input type='text' placeholder='Informe o tipo de denunciante' {...register("customizado", { required: true })} />}
                {tipoDenuncianteSelecionado !== "ANONIMO" &&
                    <>
                        <input type="text" placeholder="Nome do Denunciante" {...register('nome', { required: true })} />
                        <input type="text" placeholder="E-mail do Denunciante" {...register('email', { required: true })} />
                        <input type="text" placeholder="Telefone para contato do Denunciante" {...register('telefone', { required: true })} />
                        <input type="text" placeholder="Endereço do Denunciante" {...register('endereco', { required: true })}/>
                    </>
                }
            </div>
        </>
    );
};

export default Denunciante;