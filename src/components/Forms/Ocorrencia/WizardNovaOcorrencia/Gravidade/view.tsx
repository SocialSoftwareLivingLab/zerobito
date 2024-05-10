import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import '../style.css';
import { GravidadeFormFields } from './model';
import { FormContainer } from '../styles';
import { Select, SelectOption } from '../../../../ui/Select';

export interface GravidadeViewProps {
    submitForm: () => void;
    errors: FieldErrors<GravidadeFormFields>;
    register: UseFormRegister<GravidadeFormFields>;
}

export default function GravidadeView({ register, submitForm, errors }: GravidadeViewProps) {
    return (
        <FormContainer>
            <form onSubmit={submitForm}>
                <Select label="Condição do acidente" {...register('condicao', { required: true })}>
                    <SelectOption label="Selecione..." disabled />
                    <SelectOption label="Óbito" value="OBITO" />
                    <SelectOption
                        label="Incidente de Alto Potencial"
                        value="INCIDENTE_ALTO_POTENCIAL"
                    />
                    <SelectOption label="Atendimento Hospitalar" value="ATENDIMENTO_HOSPITALAR" />
                </Select>
                <ErrorMessage name="condicao" errors={errors} as="p" />
            </form>
        </FormContainer>
    );
}
