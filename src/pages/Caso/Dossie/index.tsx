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
import { useLocation, useNavigate } from 'react-router-dom';

function formatarData(data: string | Date): string {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export default function DossiePage() {
    const { caso } = useCasoSelecionado();
    const navigate = useNavigate();
    const location = useLocation();

    const { eventos, reunioes, proximosEventos, tarefas } = useDossieViewModel(caso.id);
    const [diaSelecionado, setDiaSelecionado] = React.useState<Date | null>(null);

    const [eventosDoDia, setEventosDoDia] = React.useState(proximosEventos.slice(0, 4));
    React.useEffect(() => {
        if (!diaSelecionado) {
            setEventosDoDia(proximosEventos.slice(0, 4));
        }
    }, [proximosEventos, diaSelecionado]);

    const filtrarEventosDoDia = (data: Date) => {
        setDiaSelecionado(data); // marca que foi clicado
        const dia = data.toISOString().split('T')[0];

        const filtrados = proximosEventos.filter((item) => {
            const itemDia = new Date(item.data).toISOString().split('T')[0];
            return itemDia === dia;
        });

        setEventosDoDia(filtrados);
    };

    const navegarParaReuniao = (data: string | Date) => {
        const d = new Date(data);
        const dataISO = d.toISOString(); // ex: "2025-10-04T14:00:00.000Z"

        let basePath = location.pathname.split('/planejamento')[0];
        basePath = basePath.replace('/dossie', '/planejamento');

        navigate(`${basePath}/reunioes/${encodeURIComponent(dataISO)}`);
    };

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
                        {eventosDoDia.map((item, index) => (
                            <div
                                key={index}
                                className="card-tarefa"
                                onClick={() =>
                                    item.tipo === 'reuniao' && navegarParaReuniao(item.data)
                                }
                                style={{
                                    cursor: item.tipo === 'reuniao' ? 'pointer' : 'default'
                                }}>
                                <div>
                                    <strong>{item.tipo === 'tarefa' ? 'Tarefa' : 'Reunião'}</strong>
                                    <div>{formatarData(item.data)}</div>
                                </div>
                                {item.tipo === 'tarefa' && (
                                    <span
                                        className={`status ${item.status
                                            .replace(/\s+/g, '-')
                                            .toLowerCase()}`}>
                                        {item.status === 'Atrasado' ? 'Atrasada' : item.status}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                    <CalendarioCustomizado
                        reunioes={reunioes}
                        tarefas={tarefas}
                        onDiaClick={(data) => filtrarEventosDoDia(data)}
                    />
                </div>
            </ColumnContainer>
        </DossieContainer>
    );
}
