import React from 'react';
import { PlanejamentoContainer } from './styles';
import AcoesReuniao from './Acoes';
import AtoresReuniao from './Tarefas';
import useDossieViewModel from '../Dossie/model';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import CalendarioCustomizado from '../../../components/Calendario';
import AtasAnteriores from './AtasAnteriores';
import { useNavigate, useLocation } from 'react-router-dom';

function formatarData(data: string | Date): string {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export default function Planejamento() {
    const { caso } = useCasoSelecionado();
    const { reunioes, proximosEventos, tarefas } = useDossieViewModel(caso.id);

    const navigate = useNavigate();
    const location = useLocation();

    const navegarParaReuniao = (data: string | Date) => {
        const d = new Date(data);
        const dataISO = d.toISOString(); // ex: "2025-10-04T14:00:00.000Z"

        const basePath = location.pathname.split('/planejamento')[0];
        navigate(`${basePath}/planejamento/reunioes/${encodeURIComponent(dataISO)}`);
    };

    return (
        <PlanejamentoContainer>
            <AcoesReuniao />
            <div className="row">
                <div className="column">
                    <div style={{ marginBottom: '20px' }}>
                        <AtoresReuniao />
                    </div>
                </div>
                <div className="column">
                    <div style={{ marginBottom: '20px' }}>
                        <div className="calendario-tarefas">
                            <div className="lista-tarefas">
                                <h3>Calendário</h3>
                                {proximosEventos.map((item, index) => (
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
                                            <strong>
                                                {item.tipo === 'tarefa' ? 'Tarefa' : 'Reunião'}
                                            </strong>
                                            <div>{formatarData(item.data)}</div>
                                        </div>
                                        {item.tipo === 'tarefa' && (
                                            <span
                                                className={`status ${item.status
                                                    .replace(/\s+/g, '-')
                                                    .toLowerCase()}`}>
                                                {item.status === 'Atrasado'
                                                    ? 'Atrasada'
                                                    : item.status}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <CalendarioCustomizado
                                reunioes={reunioes}
                                tarefas={tarefas}
                                onDiaClick={(data) => navegarParaReuniao(data)}
                            />
                        </div>
                    </div>
                    <AtasAnteriores />
                </div>
            </div>
        </PlanejamentoContainer>
    );
}
