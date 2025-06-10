import React, { useCallback, useState } from 'react';
import { PlanejamentoContainer } from './styles';
import AcoesReuniao from './Acoes';
import AtoresReuniao from './Tarefas';
import useDossieViewModel from '../Dossie/model';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import CalendarioCustomizado, { CalendarItem } from '../../../components/Calendario';
import AtasAnteriores from './AtasAnteriores';

function formatarData(data: string | Date): string {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
    });
}

export default function Planejamento() {
    const { caso } = useCasoSelecionado();
    const { eventos, reunioes, proximosEventos, tarefas } = useDossieViewModel(caso.id);
    return (
        <PlanejamentoContainer>
            <AcoesReuniao />
            <div className="row">
                <div className="column">
                    <div style={{ marginBottom: '20px' }}>
                        <AtoresReuniao></AtoresReuniao>
                    </div>
                </div>
                <div className="column">
                    <div style={{ marginBottom: '20px' }}>
                        <div className="calendario-tarefas">
                            <div className="lista-tarefas">
                                <h3>Calendário</h3>
                                {proximosEventos.map((item, index) => (
                                    <div key={index} className="card-tarefa">
                                        <div>
                                            <strong>
                                                {item.tipo === 'tarefa' ? 'Tarefa' : 'Reunião'}
                                            </strong>
                                            <div>{formatarData(item.data)}</div>
                                        </div>
                                        {item.tipo === 'tarefa' && (
                                            <span
                                                className={`status ${item.status.replace(/\s+/g, '-').toLowerCase()}`}>
                                                {item.status === 'Atrasado'
                                                    ? 'Atrasada'
                                                    : item.status}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <CalendarioCustomizado reunioes={reunioes} tarefas={tarefas} />
                        </div>
                    </div>
                    <AtasAnteriores></AtasAnteriores>
                </div>
            </div>
        </PlanejamentoContainer>
    );
}
