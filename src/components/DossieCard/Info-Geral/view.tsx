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
    const causas = [
        'AG FÍSICOS (CALOR, RUÍDO, RAD)',
        'AGENTES BIOLÓGICOS',
        'AGENTES QUIMICOS',
        'ANIMAIS/PLANTAS VENENOSOS',
        'CORPO ESTRANHO',
        'CORRENTE ELÉTRICA',
        'ESFORÇOS/PESO',
        'EXPLOSÃO/INCÊNDIO/FOGO',
        'MÁQUINAS/EQUIPAMENTOS',
        'MOTOCICLETA',
        'MOVIMENTAÇÃO DE CARGA',
        'QUEDA DE ALTURA',
        'QUEDA DE OBJETOS',
        'QUEDA DO MESMO NIVEL',
        'SUBSTÂNCIAS QUENTES',
        'SOTERRAMENTO',
        'VEÍCULO DE TRANSPORTE',
        'OUTROS',
        'INDEFINIDO'
    ];
    const diagnosticos = [
        'ALERGIAS',
        'AMPUTAÇÃO',
        'CONTUSÃO',
        'CORPO ESTRANHO',
        'DIST RESPIRATÓRIO',
        'ENTORSE',
        'ESCORIAÇÕES',
        'ESMAGAMENTO',
        'FCC',
        'FRATURA',
        'INFECÇÃO',
        'INTOX/ENVENENAM',
        'LESÃO MEDULAR',
        'PERFURAÇÃO',
        'POLITRAUMATISMO',
        'QUEIMADURA',
        'TCE',
        'TRAUMA VISCERAL',
        'OUTROS',
        'INDEFINIDO'
    ];
    return (
        <form onSubmit={handleCompleteEdit}>
            <h3>Causa Primária</h3>
            <TextEditavel
                options={causas}
                label={''}
                title={causaPrimariaSelecionada}
                handleCompleteEdit={handleCompleteEdit}
                {...register('CausaPrimaria')}></TextEditavel>
            <h3>Causa Secundária</h3>
            <TextEditavel
                options={causas}
                label={''}
                title={causaSecundariaSelecionada}
                handleCompleteEdit={handleCompleteEdit}
                {...register('CausaSecundaria')}></TextEditavel>
            <h3>Diagnóstico</h3>
            <TextEditavel
                options={diagnosticos}
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
