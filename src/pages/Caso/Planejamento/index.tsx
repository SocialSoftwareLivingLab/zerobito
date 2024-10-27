import React from 'react';
import { PlanejamentoContainer } from './styles';
import AcoesReuniao from './Acoes';
import { ColumnContainer } from '../../../components/ui/ColumnContainer';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { FaInfoCircle, FaRegCalendar } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import TarefasReuniao from './Tarefas';
import AtasAnteriores from './Atas-Anteriores';

export default function Planejamento() {
    return (
        <PlanejamentoContainer>
            <AcoesReuniao />
            <div className="row">
                <div className="column">
                    <BoxContainer titulo={''}>
                        <div className="blue-line">
                            <h3>
                                {' '}
                                <FaInfoCircle /> Ata da reunião
                            </h3>
                        </div>
                    </BoxContainer>
                </div>
                <div className="column">
                    <div style={{ marginBottom: '20px' }}>
                        <TarefasReuniao></TarefasReuniao>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <BoxContainer titulo={''}>
                            <div className="blue-line">
                                <h3>
                                    {' '}
                                    <FaRegCalendar /> Próxima Reunião
                                </h3>
                            </div>
                        </BoxContainer>
                    </div>
                    <AtasAnteriores></AtasAnteriores>
                </div>
            </div>
        </PlanejamentoContainer>
    );
}
