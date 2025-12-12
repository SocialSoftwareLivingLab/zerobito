import React from 'react';
import { InvestigacaoContainer } from './styles';
import AcoesPreparacao from '../Preparacao/Acoes';
import ConvidadosGrupoTrabalho from '../Preparacao/Convidados';
import AcoesInvestigacao from './Acoes';
import MapaInvestigacao from './Etapas';

export default function Investigacao() {
    return (
        <InvestigacaoContainer>
            <AcoesInvestigacao />
            <MapaInvestigacao></MapaInvestigacao>
        </InvestigacaoContainer>
    );
}
