import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import "../style.css";
import { DenuncianteFormInput } from './model';

export interface DenuncianteViewProps {
    submitForm: () => void;
    errors: FieldErrors<DenuncianteFormInput>;
    register: UseFormRegister<DenuncianteFormInput>;
    tipoDenuncianteSelecionado: string;
}

export default function DenuncianteView(
    { register, submitForm, tipoDenuncianteSelecionado, errors }: DenuncianteViewProps
) {
    return (
        <>
            <h1>Informações sobre o acidente</h1>
            <div className="form-container">
                <form onSubmit={submitForm}>
                    <select className='form-container-select' {...register('tipo')}>
                        <option value="ANONIMO">Denunciante Anônimo</option>
                        <option value="VITIMA">Vítima</option>
                        <option value="FAMILIAR">Familiar</option>
                        <option value="COLEGA_TRABALHO">Colega de Trabalho</option>
                        <option value="SINDICATO">Sindicato</option>
                        <option value="IMPRENSA">Imprensa</option>
                        <option value="SERVICO_SAUDE">Serviço de Saúde</option>
                        <option value="OUTRO">Outro</option>
                    </select>

                    <ErrorMessage errors={errors} name='tipo' as="p" />

                    {tipoDenuncianteSelecionado === 'OUTRO' && <input type='text' placeholder='Informe o tipo de denunciante' {...register("customizado", { required: true })} />}
                    {tipoDenuncianteSelecionado !== "ANONIMO" &&
                        <>
                            <input type="text" placeholder="Nome do Denunciante" {...register('nome', { required: true })} />
                            <ErrorMessage name='nome' errors={errors} as="p" />

                            <input type="text" placeholder="E-mail do Denunciante" {...register('email', { required: true })} />
                            <ErrorMessage name='email' errors={errors} as="p" />

                            <input type="text" placeholder="Telefone para contato do Denunciante" {...register('telefone', { required: true })} />
                            <ErrorMessage name='telefone' errors={errors} as="p" />

                            <input type="text" placeholder="Endereço do Denunciante" {...register('endereco', { required: true })} />
                            <ErrorMessage name='endereco' errors={errors} as="p" />
                        </>
                    }
                </form>
            </div>
        </>
    );
};