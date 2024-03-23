import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import "../style.css";
import { LocalidadeFormFields } from './model';

export interface LocalidadeViewProps {
    submitForm: () => void;
    errors: FieldErrors<LocalidadeFormFields>;
    register: UseFormRegister<LocalidadeFormFields>;
}

export default function LocalidadeView(
    { submitForm, errors, register }: LocalidadeViewProps
) {
    return (
        <div className='form-container'>
            <h1>Informações sobre o acidente:</h1>
            <form onSubmit={submitForm}>
                <input type="text" placeholder="Estado" {...register('estado', { required: true })} />
                <ErrorMessage name='estado' errors={errors} as="p" />

                <input type="text" placeholder="Cidade" {...register('cidade', { required: true })} />
                <ErrorMessage name='cidade' errors={errors} as="p" />

                <input type="text" placeholder="Logradouro"  {...register('logradouro', { required: true })} />
                <ErrorMessage name='logradouro' errors={errors} as="p" />
            </form>
        </div>
    );
};

