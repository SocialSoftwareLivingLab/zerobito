import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import "../style.css";
import { DenuncianteFormInput } from './model';
import { Select, SelectOption } from '../../../ui/Select';
import { FormContainer } from '../styles';
import Input from '../../../ui/Input';

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
            <FormContainer>
                <form onSubmit={submitForm}>
                    <Select label='Tipo da Denúncia' {...register('tipo')}>
                        <SelectOption />
                        <SelectOption label="Denunciante Anônimo" value="ANONIMO" />
                        <SelectOption label="Vítima" value="VITIMA" />
                        <SelectOption label="Familiar" value="FAMILIAR" />
                        <SelectOption label="Colega de Trabalho" value="COLEGA_TRABALHO" />
                        <SelectOption label="Sindicato" value="SINDICATO" />
                        <SelectOption label="Imprensa" value="IMPRENSA" />
                        <SelectOption label="Serviço de Saúde" value="SERVICO_SAUDE" />
                        <SelectOption label="Outro" value="OUTRO" />
                    </Select>

                    <ErrorMessage errors={errors} name='tipo' as="p" />

                    {tipoDenuncianteSelecionado === 'OUTRO' && <Input label="Tipo de Denunciante" placeholder='Informe o tipo de denunciante' {...register("customizado", { required: true })} />}
                    {tipoDenuncianteSelecionado !== "ANONIMO" &&
                        <>
                            {/* <input type="text" placeholder="Nome do Denunciante" {...register('nome', { required: true })} /> */}
                            <Input label="Nome do Denunciante" placeholder="Nome do Denunciante" {...register('nome', { required: true })} />
                            <ErrorMessage name='nome' errors={errors} as="p" />

                            {/* <input type="text" placeholder="E-mail do Denunciante" {...register('email', { required: true })} /> */}
                            <Input label="E-mail do Denunciante" placeholder="E-mail do Denunciante" {...register('email', { required: true })} />
                            <ErrorMessage name='email' errors={errors} as="p" />

                            {/* <input type="text" placeholder="Telefone para contato do Denunciante" {...register('telefone', { required: true })} />*/}
                            <Input label="Telefone para contato" placeholder="Telefone para contato" {...register('telefone', { required: true })} />
                            <ErrorMessage name='telefone' errors={errors} as="p" />

                            {/* <input type="text" placeholder="Endereço do Denunciante" {...register('endereco', { required: true })} /> */}
                            <Input label="Endereço" placeholder="Endereço" {...register('endereco', { required: true })} />
                            <ErrorMessage name='endereco' errors={errors} as="p" />
                        </>
                    }
                </form>
            </FormContainer>
        </>
    );
};