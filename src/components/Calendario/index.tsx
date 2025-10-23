import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.css';
import { Tarefa } from '../../contexts/minhas-tarefas';

export type CalendarItem = { data: string }; // data com hora, ex: "2025-10-04T14:00:00Z"

interface MeuCalendarioProps {
    tarefas?: Tarefa[];
    reunioes?: CalendarItem[];
    onDiaClick?: (data: Date) => void;
}

export function MeuCalendario({ reunioes = [], tarefas = [], onDiaClick }: MeuCalendarioProps) {
    const datasTarefasDetalhadas = tarefas.map((t) => {
        const dataStr = new Date(t.prazo).toISOString().split('T')[0];
        const atrasada = t.status === 'Atrasado';
        return { data: dataStr, atrasada };
    });

    // 🔹 guarda todas as reuniões com hora
    const datasReunioesDetalhadas = reunioes.map((r) => new Date(r.data));
    // 🔹 só para marcar bolinhas (dia sem hora)
    const datasReunioes = datasReunioesDetalhadas.map((d) => d.toISOString().split('T')[0]);

    return (
        <div className="calendario-wrapper">
            <Calendar
                view="month"
                minDetail="month"
                maxDetail="month"
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
                onClickDay={(date) => {
                    const dateStr = date.toISOString().split('T')[0];
                    if (datasReunioes.includes(dateStr)) {
                        // 🔹 pega TODAS reuniões desse dia
                        const reunioesDoDia = datasReunioesDetalhadas.filter(
                            (d) => d.toISOString().split('T')[0] === dateStr
                        );
                        // 🔹 ordena por hora
                        reunioesDoDia.sort((a, b) => a.getTime() - b.getTime());
                        // 🔹 pega a primeira reunião do dia
                        if (reunioesDoDia.length > 0) {
                            onDiaClick?.(reunioesDoDia[0]);
                        }
                    }
                }}
            />
        </div>
    );
}

export default MeuCalendario;
