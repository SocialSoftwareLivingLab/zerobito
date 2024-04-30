import React from 'react';
import { TextEditavel } from '../../ui/text_editavel';

import { UseFormRegister } from 'react-hook-form';
import { InfoGeralFormData } from './model';

export interface InfoGeralDossieViewProps {
    register: UseFormRegister<InfoGeralFormData>;
    handleCompleteEdit: () => void;
}

export function InfoGeralDossieView({ register, handleCompleteEdit }: InfoGeralDossieViewProps) {
    return (
        <form onSubmit={handleCompleteEdit}>
            <h3>Causa Primária</h3>
            <TextEditavel
                options={['acidente', 'doença', 'alergia']}
                label={''}
                {...register('CausaPrimaria')}></TextEditavel>
            <h3>Causa Secundária</h3>
            <TextEditavel
                options={['acidente', 'doença', 'alergia']}
                label={''}
                {...register('CausaSecundaria')}></TextEditavel>
            <h3>Diagnóstico</h3>
            <TextEditavel
                options={['acidente', 'doença', 'alergia']}
                label={''}
                {...register('Diagnostico')}></TextEditavel>
            <h3>Comentários</h3>
        </form>
    );
}
