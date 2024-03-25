import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
// import "../style.css";
import { InformacoesBasicasFormFields } from './model';
import Input from '../../../ui/Input';
import { FormContainer } from '../styles';
import Fieldset from '../../../ui/Fieldset';

export interface InformacoesBasicasViewProps {
    submitForm: () => void;
    errors: FieldErrors<InformacoesBasicasFormFields>;
    register: UseFormRegister<InformacoesBasicasFormFields>;
}

export default function InformacoesBasicasView(
    { submitForm, errors, register }: InformacoesBasicasViewProps
) {
    return (
        <FormContainer>
            <h1>Informações sobre o acidente:</h1>
            <form onSubmit={submitForm}>
                <Fieldset legend='Identificação'>
                    <Input placeholder='Informe a data' label='Data relatada' type='date' {...register('data', { required: true })} />
                    <ErrorMessage name='data' errors={errors} as="p" />

                    <Input placeholder='Descrição' label='Informe a descrição' type='text' {...register('data', { required: true })} />
                    <ErrorMessage name='data' errors={errors} as="p" />
                </Fieldset>

                <Fieldset legend="Localização">
                    <Input placeholder="Informe o estado" label="Estado" {...register('estado', { required: true })} />
                    <ErrorMessage name='estado' errors={errors} as="p" />

                    <Input placeholder="Informe a cidade" label="Cidade" {...register('cidade', { required: true })} />
                    <ErrorMessage name='cidade' errors={errors} as="p" />

                    <Input placeholder="Informe o logradouro" label="Logradouro" {...register('logradouro', { required: true })} />
                    <ErrorMessage name='logradouro' errors={errors} as="p" />
                </Fieldset>
            </form>
        </FormContainer>
    );
};

