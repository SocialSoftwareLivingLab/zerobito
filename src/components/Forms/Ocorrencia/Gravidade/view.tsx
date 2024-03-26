import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import "../style.css";
import { GravidadeFormFields } from './model';
import { FormContainer } from '../styles';
import { Select, SelectOption } from '../../../ui/Select';

export interface GravidadeViewProps {
    submitForm: () => void;
    errors: FieldErrors<GravidadeFormFields>;
    register: UseFormRegister<GravidadeFormFields>;
    condicao: string;
}

export default function GravidadeView(
    { register, submitForm, errors, condicao }: GravidadeViewProps
) {
    return (
        <FormContainer>
            <h1>Informações sobre o acidente:</h1>
            <form onSubmit={submitForm}>
                <Select label='Condição do acidente' {...register('condicao', { required: true })} >
                    <SelectOption label='Selecione...' disabled />
                    <SelectOption label='Obito' value="OBITO"  />
                    <SelectOption label='Incidente de Alto Potencial' value="INCIDENTE_ALTO_POTENCIAL" />
                </Select>
                <ErrorMessage name='condicao' errors={errors} as="p" />

                {condicao !== "OBITO" && (
                    <>
                        <Select label='Gravidade do acidente' {...register('gravidade', { required: condicao !== 'OBITO' })}>
                            <SelectOption label='Selecione...' disabled />
                            <SelectOption label='Emergencial' value="EMERGENCIAL" />
                            <SelectOption label='Muito Grave' value="MUITO_URGENTE" />
                            <SelectOption label='Urgência' value="URGENTE" />
                            <SelectOption label='Pouca Urgência' value="POUCO_URGENTE" />
                        </Select>
                        <ErrorMessage errors={errors} name='gravidade' as="p" />
                    </>
                )}

            </form>

        </FormContainer>
    );
}