import React, { useCallback, useEffect, useState } from 'react';
import { DossieCard } from '../../../components/DossieCard';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { ColumnContainer } from '../../../components/ui/ColumnContainer';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { DossieContainer } from './styles';
import { TabelaOcorrenciaNovo } from '../../../components/Tabelas/Ocorrencias';
import useDossieViewModel from './model';
import { TabelaOcorrenciaSimplesNovo } from '../../../components/Tabelas/OcorrenciasSimples';
import SuasTarefas from '../../../components/Tabelas/tarefas-user-dossie';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value } from 'react-calendar/dist/esm/shared/types.js';
import CalendarioCustomizado, { CalendarItem } from '../../../components/Calendario';
import { getReunioes } from '../../../common/api/casos/planejamento/get-reunioes-marcadas';
import { useTarefas } from '../../../contexts/minhas-tarefas';

function formatarData(data: string | Date): string {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
    });
}

export default function DossiePage() {
    const { caso } = useCasoSelecionado();

    const { eventos, reunioes, proximosEventos, tarefas } = useDossieViewModel(caso.id);

    return (
        <DossieContainer>
            <ColumnContainer>
                <DossieCard caso={caso}></DossieCard>
            </ColumnContainer>
            <ColumnContainer className="semFundo">
                <div className="space">
                    <TabelaOcorrenciaSimplesNovo ocorrencias={eventos} />
                </div>
                <div className="space">
                    <SuasTarefas />
                </div>
                <div className="calendario-tarefas">
                    <div className="lista-tarefas">
                        <h3>Calendário</h3>
                        {proximosEventos.map((item, index) => (
                            <div key={index} className="card-tarefa">
                                <div>
                                    <strong>{item.tipo === 'tarefa' ? 'Tarefa' : 'Reunião'}</strong>
                                    <div>{formatarData(item.data)}</div>
                                </div>
                                {item.tipo === 'tarefa' && (
                                    <span
                                        className={`status ${item.status.replace(/\s+/g, '-').toLowerCase()}`}>
                                        {item.status === 'Atrasado' ? 'Atrasada' : item.status}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                    <CalendarioCustomizado reunioes={reunioes} tarefas={tarefas} />
                </div>
            </ColumnContainer>
        </DossieContainer>
    );
}
