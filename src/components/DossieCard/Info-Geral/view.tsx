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
        'Agentes físicos (calor, ruído, radiação)',
        'Agentes biológicos',
        'Animais/Plantas venenosos',
        'Corpo estranho',
        'Corrente elétrica',
        'Esforço/Peso',
        'Explosão/Incêndio/Fogo',
        'Máquinas/Equipamentos',
        'Motocicleta',
        'Movimentação de Carga',
        'Queda de altura',
        'Queda de objetos',
        'Queda do mesmo nível',
        'Substâncias quentes',
        'Soterramento',
        'Veículo de transporte',
        'Outros',
        'Indefinido'
    ];
    const diagnosticos = [
        'Alergias',
        'Amputação',
        'Corpo estranho',
        'Dist. Respiratório',
        'Entorse',
        'Escoriações',
        'Esmagamento',
        'FCC',
        'Fratura',
        'Infecção',
        'Intoxicação/Envenenamento',
        'Lesão Medular',
        'Perfuração',
        'Politraumatismo',
        'Queimadura',
        'TCE',
        'Trauma Visceral',
        'Outros',
        'Indefinido'
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
