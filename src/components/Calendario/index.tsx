import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.css';
import { Tarefa } from '../../contexts/minhas-tarefas';

export type CalendarItem = { data: string; titulo?: string };

interface MeuCalendarioProps {
    tarefas?: Tarefa[];
    reunioes?: CalendarItem[];
    onDiaClick?: (data: Date) => void;
}

interface TileConteudoProps {
    date: Date;
    view: string;
    datasTarefasDetalhadas: { data: string; atrasada: boolean }[];
    reunioesPorData: Map<string, CalendarItem>;
}

function TileConteudo({ date, view, datasTarefasDetalhadas, reunioesPorData }: TileConteudoProps) {
    if (view !== 'month') return null;
    const dateStr = localDateStr(date);
    const tarefaDoDia = datasTarefasDetalhadas.find((t) => t.data === dateStr);
    const hasTarefa = !!tarefaDoDia;
    const isAtrasada = tarefaDoDia?.atrasada;
    const reuniaoDoDia = reunioesPorData.get(dateStr);

    return (
        <div className="bolinhas-container">
            {hasTarefa && (
                <span
                    className={`bolinha ${isAtrasada ? 'atrasada' : 'tarefa'}`}
                    title={isAtrasada ? 'Tarefa Atrasada' : 'Tarefa'}></span>
            )}
            {reuniaoDoDia && (
                <span className="bolinha reuniao" title={reuniaoDoDia.titulo ?? 'Reunião'}></span>
            )}
        </div>
    );
}

function localDateStr(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

export function MeuCalendario({ reunioes = [], tarefas = [], onDiaClick }: MeuCalendarioProps) {
    const datasTarefasDetalhadas = tarefas.map((t) => {
        const dataStr = new Date(t.prazo).toISOString().split('T')[0];
        const atrasada = t.status === 'Atrasado';
        return { data: dataStr, atrasada };
    });

    const reunioesPorData = new Map<string, CalendarItem>();
    reunioes.forEach((r) => {
        const key = r.data.split('T')[0];
        reunioesPorData.set(key, r);
    });

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
                tileContent={({ date, view }) => (
                    <TileConteudo
                        date={date}
                        view={view}
                        datasTarefasDetalhadas={datasTarefasDetalhadas}
                        reunioesPorData={reunioesPorData}
                    />
                )}
                onClickDay={(date) => {
                    onDiaClick?.(date);
                }}
            />
        </div>
    );
}

export default MeuCalendario;
