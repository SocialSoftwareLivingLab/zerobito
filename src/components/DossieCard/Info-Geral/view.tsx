import React from 'react';
import { TextEditavel } from '../../ui/text_editavel';

import { UseFormRegister, UseFormReset } from 'react-hook-form';
import { InfoGeralFormData } from './model';
import { CommentEditavel } from '../../ui/comentEditavel';
import { listarCausas } from '../../../common/api/casos/listarCausas';
import { Caso } from '../../../common/models/caso/caso';

export interface InfoGeralDossieViewProps {
    register: UseFormRegister<InfoGeralFormData>;
    handleCompleteEdit: () => void;
    causaPrimariaSelecionada: string;
    causaSecundariaSelecionada: string;
    diagnosticoSelecionado: string;
    comentarioSelecionado: string;
    causas: string[];
    diagnosticos: string[];
    reset: UseFormReset<InfoGeralFormData>;
}

export function InfoGeralDossieView({
    register,
    handleCompleteEdit,
    causaPrimariaSelecionada,
    causaSecundariaSelecionada,
    diagnosticoSelecionado,
    comentarioSelecionado,
    causas,
    diagnosticos,
    reset
}: InfoGeralDossieViewProps) {
    return (
        <form onSubmit={handleCompleteEdit}>
            <h3>Causa Primária</h3>
            <TextEditavel
                options={causas}
                label={''}
                title={causaPrimariaSelecionada}
                handleCompleteEdit={handleCompleteEdit}
                register={register('CausaPrimaria')}
                cancel={reset}></TextEditavel>
            <h3>Causa Secundária</h3>
            <TextEditavel
                options={causas}
                label={''}
                title={causaSecundariaSelecionada}
                handleCompleteEdit={handleCompleteEdit}
                register={register('CausaSecundaria')}
                cancel={reset}></TextEditavel>
            <h3>Diagnóstico</h3>
            <TextEditavel
                options={diagnosticos}
                label={''}
                title={diagnosticoSelecionado}
                handleCompleteEdit={handleCompleteEdit}
                register={register('Diagnostico')}
                cancel={reset}></TextEditavel>
            <h3>Comentários</h3>
            <CommentEditavel
                label={''}
                title={comentarioSelecionado}
                handleCompleteEdit={handleCompleteEdit}
                register={register('Comentario')}
                cancel={reset}></CommentEditavel>
        </form>
    );
}
