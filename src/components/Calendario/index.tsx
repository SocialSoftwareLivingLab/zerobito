import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.css';
import { Tarefa } from '../../contexts/minhas-tarefas';

export type CalendarItem = { data: string };

interface MeuCalendarioProps {
    tarefas?: Tarefa[];
    reunioes?: CalendarItem[];
}

export function MeuCalendario({ reunioes = [], tarefas = [] }: MeuCalendarioProps) {
    const hojeStr = new Date().toISOString().split('T')[0];

    const datasTarefasDetalhadas = tarefas.map((t) => {
        const dataStr = new Date(t.prazo).toISOString().split('T')[0];
        const atrasada = t.status === 'Atrasado';
        return { data: dataStr, atrasada };
    });

    const datasReunioes = reunioes.map((r) => new Date(r.data).toISOString().split('T')[0]);

    return (
        <div className="calendario-wrapper">
            <Calendar
                view="month" // mostra apenas os meses
                minDetail="month" // impede seleção de ano
                maxDetail="month" // impede seleção de dia/ano
                prevLabel="‹"
                nextLabel="›"
                showNeighboringMonth={false}
                formatMonthYear={(locale, date) => date.toLocaleString(locale, { month: 'long' })}
                formatShortWeekday={(locale, date) =>
                    date.toLocaleDateString(locale, { weekday: 'short' }).charAt(0).toUpperCase()
                }
                tileContent={({ date, view }) => {
                    if (view !== 'month') return null;
                    const dateStr = date.toISOString().split('T')[0];

                    const tarefaDoDia = datasTarefasDetalhadas.find((t) => t.data === dateStr);
                    const hasTarefa = !!tarefaDoDia;
                    const isAtrasada = tarefaDoDia?.atrasada;
                    const hasReuniao = datasReunioes.includes(dateStr);

                    return (
                        <div className="bolinhas-container">
                            {hasTarefa && (
                                <span
                                    className={`bolinha ${isAtrasada ? 'atrasada' : 'tarefa'}`}
                                    title={isAtrasada ? 'Tarefa Atrasada' : 'Tarefa'}></span>
                            )}
                            {hasReuniao && (
                                <span className="bolinha reuniao" title="Reunião"></span>
                            )}
                        </div>
                    );
                }}
            />
        </div>
    );
}

export default MeuCalendario;
