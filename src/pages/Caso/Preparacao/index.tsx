import React from 'react';
import AcoesPreparacao from './Acoes';
import ConvidadosGrupoTrabalho from './Convidados';
import { PreparacaoContainer } from './styles';

export default function Preparacao() {
    return (
        <PreparacaoContainer>
            <AcoesPreparacao />
            <ConvidadosGrupoTrabalho></ConvidadosGrupoTrabalho>
        </PreparacaoContainer>
    );
}
