import React from 'react';
import { TextEditavel } from '../../ui/text_editavel';

import { UseFormRegister } from 'react-hook-form';
import { InfoGeralFormData } from './model';
import { CommentEditavel } from '../../ui/comentEditavel';

export interface InfoGeralDossieViewProps {
    register: UseFormRegister<InfoGeralFormData>;
    handleCompleteEdit: () => void;
    causaPrimariaSelecionada: string;
    causaSecundariaSelecionada: string;
    diagnosticoSelecionado: string;
    comentarioSelecionado: string;
}

export function InfoGeralDossieView({
    register,
    handleCompleteEdit,
    causaPrimariaSelecionada,
    causaSecundariaSelecionada,
    diagnosticoSelecionado,
    comentarioSelecionado
}: InfoGeralDossieViewProps) {
    return (
        <form onSubmit={handleCompleteEdit}>
            <h3>Causa Primária</h3>
            <TextEditavel
                options={['acidente', 'doença', 'alergia']}
                label={''}
                title={causaPrimariaSelecionada}
                handleCompleteEdit={handleCompleteEdit}
                {...register('CausaPrimaria')}></TextEditavel>
            <h3>Causa Secundária</h3>
            <TextEditavel
                options={['acidente', 'doença', 'alergia']}
                label={''}
                title={causaSecundariaSelecionada}
                handleCompleteEdit={handleCompleteEdit}
                {...register('CausaSecundaria')}></TextEditavel>
            <h3>Diagnóstico</h3>
            <TextEditavel
                options={['acidente', 'doença', 'alergia']}
                label={''}
                title={diagnosticoSelecionado}
                handleCompleteEdit={handleCompleteEdit}
                {...register('Diagnostico')}></TextEditavel>
            <h3>Comentários</h3>
            <CommentEditavel
                label={''}
                title={comentarioSelecionado}
                handleCompleteEdit={handleCompleteEdit}
                {...register('Diagnostico')}></CommentEditavel>
        </form>
    );
}
