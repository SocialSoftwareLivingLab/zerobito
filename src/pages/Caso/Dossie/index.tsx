import React from 'react';
import { DossieContainer } from '../../../components/ui/DossieContainer';
import { ColumnContainer } from '../../../components/ui/ColumnContainer';
import { DossieCard } from '../../../components/DossieCard';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';

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
