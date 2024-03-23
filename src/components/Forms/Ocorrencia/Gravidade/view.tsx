import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import "../style.css";
import { GravidadeFormFields } from './model';

export interface GravidadeViewProps {
    submitForm: () => void;
    errors: FieldErrors<GravidadeFormFields>;
    register: UseFormRegister<GravidadeFormFields>;
    obito: string;
}

export default function GravidadeView(
    { register, submitForm, errors, obito }: GravidadeViewProps
) {
    return (
        <div className='form-container'>
            <h1>Informações sobre o acidente:</h1>
            <form onSubmit={submitForm}>
                <select className='form-container-select' {...register('obito', { required: true })} >
                    <option>Selecione...</option>
                    <option value="SIM">Com Óbito</option>
                    <option value="NAO">Sem Óbito</option>
                </select>
                <ErrorMessage name='obito' errors={errors} as="p" />

                {obito === "NAO" && (
                    <>
                        <select className='form-container-select' {...register('gravidade', { required: obito === 'NAO' })} >
                            <option disabled>Selecione...</option>
                            <option value="EMERGENCIAL">Emergencial</option>
                            <option value="MUITO_URGENTE">Muito Grave</option>
                            <option value="URGENTE">Urgência</option>
                            <option value="POUCO_URGENTE">Pouca Urgência</option>
                        </select>
                        <ErrorMessage errors={errors} name='gravidade' as="p" />
                    </>
                )}

            </form>

        </div>
    );
}