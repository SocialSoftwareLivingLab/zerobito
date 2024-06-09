import React from 'react';
import { DossieCard } from '../../../components/DossieCard';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { ColumnContainer } from '../../../components/ui/ColumnContainer';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { DossieContainer } from './styles';

export default function DossiePage() {
    const { caso } = useCasoSelecionado();
    return (
        <DossieContainer>
            <ColumnContainer>
                <DossieCard data={caso}></DossieCard>
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
            </ColumnContainer>
        </DossieContainer>
    );
}
