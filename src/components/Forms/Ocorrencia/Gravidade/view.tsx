import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import "../style.css";
import { GravidadeFormFields } from './model';
import { FormContainer } from '../styles';
import { Select } from '../../../ui/Select';

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
        <FormContainer>
            <h1>Informações sobre o acidente:</h1>
            <form onSubmit={submitForm}>
                <Select label='Acidente com óbito?' {...register('obito', { required: true })} >
                    <option>Selecione...</option>
                    <option value="SIM">Sim</option>
                    <option value="NAO">Não</option>
                </Select>
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

        </FormContainer>
    );
}