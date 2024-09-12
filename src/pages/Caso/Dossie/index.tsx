import React from 'react';
import { DossieCard } from '../../../components/DossieCard';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { ColumnContainer } from '../../../components/ui/ColumnContainer';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { DossieContainer } from './styles';
import { TabelaOcorrenciaNovo } from '../../../components/Tabelas/Ocorrencias';
import useDossieViewModel from './model';
import { TabelaOcorrenciaSimplesNovo } from '../../../components/Tabelas/OcorrenciasSimples';

export default function DossiePage() {
    const { caso } = useCasoSelecionado();

    const { eventos } = useDossieViewModel(caso.id);

    return (
        <DossieContainer>
            <ColumnContainer>
                <DossieCard caso={caso}></DossieCard>
            </ColumnContainer>
            <ColumnContainer>
                <BoxContainer titulo={'Digite infos'}>
                    <span>Infos</span>
                </BoxContainer>
                <BoxContainer titulo={'Digite infos'}>
                    <span>Infos</span>
                </BoxContainer>
                <BoxContainer titulo={'Digite infos'}>
                    <span>Infos</span>
                </BoxContainer>
                <BoxContainer titulo={'Digite infos'}>
                    <span>Infos</span>
                </BoxContainer>
                <BoxContainer titulo={'Digite infos'}>
                    <span>Infos</span>
                </BoxContainer>
                <BoxContainer titulo={'Digite infos'}>
                    <span>Infos</span>
                </BoxContainer>
                <BoxContainer titulo={'Digite infos'}>
                    <span>Infos</span>
                </BoxContainer>
                <BoxContainer titulo={'Digite infos'}>
                    <span>Infos</span>
                </BoxContainer>
                <BoxContainer titulo={'Digite infos'}>
                    <span>Infos</span>
                </BoxContainer>
                <TabelaOcorrenciaSimplesNovo ocorrencias={eventos} />
            </ColumnContainer>
        </DossieContainer>
    );
}
