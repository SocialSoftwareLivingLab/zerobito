import React from 'react';
import TextEditavel from '../../ui/text_editavel';
import { register } from '../../../common/models/user/create.user';
import { InfoGeralViewProps } from '..';

// eslint-disable-next-line no-empty-pattern
export default function DossieView({ register, handleCompleteEdit, errors }: InfoGeralViewProps) {
    const dateFormat = Intl.DateTimeFormat('pt-br');
    return (
        <div>
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
        </div>
    );
}
