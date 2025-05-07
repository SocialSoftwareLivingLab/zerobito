import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.css';

export type CalendarItem = { data: string };

interface MeuCalendarioProps {
    tarefas?: CalendarItem[];
    reunioes?: CalendarItem[];
}

const tarefas = [
    { id: 1, titulo: 'Fazer relatório', data: '2025-05-06' },
    { id: 2, titulo: 'Enviar e-mail', data: '2025-05-08' }
];

export function MeuCalendario({ reunioes = [] }: MeuCalendarioProps) {
    const datasTarefas = tarefas.map((t) => t.data);
    const datasReunioes = reunioes.map((r) => new Date(r.data).toISOString().split('T')[0]);
    console.log(datasReunioes);

    return (
        <Calendar
            tileContent={({ date, view }) => {
                if (view !== 'month') return null;
                const dateStr = date.toISOString().split('T')[0];
                const hasTarefa = datasTarefas.includes(dateStr);
                const hasReuniao = datasReunioes.includes(dateStr);

                return (
                    <div className="bolinhas-container">
                        {hasTarefa && (
                            <span className="bolinha tarefa" title="Tarefa">
                                {' '}
                            </span>
                        )}
                        {hasReuniao && <span className="bolinha reuniao" title="Reunião"></span>}
                    </div>
                );
            }}
        />
    );
}

export default MeuCalendario;
