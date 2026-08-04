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

type TipoBadge = 'success' | 'warning' | 'danger';

const STATUS_BADGE: Record<string, TipoBadge> = {
    CONCLUIDO: 'success',
    REALIZADO: 'success',
    ACEITO: 'success',
    ATRASADO: 'danger',
    MONITORANDO: 'danger',
    RECUSADO: 'danger',
    EM_ANDAMENTO: 'warning',
    PENDENTE: 'warning'
};

const BADGE_ORDER: TipoBadge[] = ['danger', 'warning', 'success'];

interface TileConteudoProps {
    date: Date;
    view: string;
    tarefasPorData: Map<string, Set<TipoBadge>>;
    reunioesPorData: Map<string, CalendarItem>;
}

function TileConteudo({
    date,
    view,
    tarefasPorData,
    reunioesPorData
}: Readonly<TileConteudoProps>) {
    if (view !== 'month') return null;
    const dateStr = localDateStr(date);
    const tipos = tarefasPorData.get(dateStr);
    const reuniaoDoDia = reunioesPorData.get(dateStr);

    return (
        <div className="bolinhas-container">
            {tipos &&
                BADGE_ORDER.filter((t) => tipos.has(t)).map((tipo) => (
                    <span key={tipo} className={`bolinha bolinha-${tipo}`} title={tipo}></span>
                ))}
            {reuniaoDoDia && (
                <span
                    className="bolinha bolinha-reuniao"
                    title={reuniaoDoDia.titulo ?? 'Reunião'}></span>
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
    const tarefasPorData = new Map<string, Set<TipoBadge>>();
    tarefas.forEach((t) => {
        const dataStr = new Date(t.prazo).toISOString().split('T')[0];
        const codigoStatus = t.status.toUpperCase().replace(/\s+/g, '_');
        const tipo: TipoBadge = STATUS_BADGE[codigoStatus] ?? 'warning';
        if (!tarefasPorData.has(dataStr)) {
            tarefasPorData.set(dataStr, new Set<TipoBadge>());
        }
        tarefasPorData.get(dataStr)!.add(tipo);
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
                        tarefasPorData={tarefasPorData}
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
