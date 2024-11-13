import React, { useCallback, useState } from 'react';
import { PlanejamentoContainer } from './styles';
import AcoesReuniao from './Acoes';
import AtoresReuniao from './Tarefas';

export default function Planejamento() {
    return (
        <PlanejamentoContainer>
            <AcoesReuniao />
            <div className="row">
                <div className="column">
                    <div style={{ marginBottom: '20px' }}>
                        <AtoresReuniao></AtoresReuniao>
                    </div>
                </div>
            </div>
        </PlanejamentoContainer>
    );
}
