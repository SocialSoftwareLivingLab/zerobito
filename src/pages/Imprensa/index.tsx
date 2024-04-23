import React from 'react';
import './style.css';
import Header from '../../components/Page-Header';
import { BoxContainer } from '../../components/ui/BoxContainer';
import { Button } from '../../components/ui/Button';
import { DossieNavContainer } from '../../components/ui/DossieNavBar';
import { DossieBarContainer, OcorrenciaStep } from '../../components/ui/DossieItemBar';
import { DossieContainer } from '../../components/ui/DossieContainer';
import { ColumnContainer } from '../../components/ui/ColumnContainer';
import { DossieCard } from '../../components/DossieCard';

const step: OcorrenciaStep = {
    step: 'Dossiê'
};
const data: string[] = ['0020', '17/03/2003', 'Aguardando', '8', 'meio dia'];

const Imprensa = () => {
    return (
        <div>
            <Header
                title="Dossiê"
                explicacao="Aqui o cordenador local tem uma visão global do caso. Pode dar inicio à Preparação/Reunião de Trabalho
                e Qualificar a documentação"
            />
            <DossieNavContainer
                id="12"
                status="Aguardando Analise"
                data="17/03/2003"></DossieNavContainer>
            <DossieBarContainer step={step}></DossieBarContainer>
            <DossieContainer>
                <ColumnContainer>
                    <DossieCard data={data}></DossieCard>
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
        </div>
    );
};

export default Imprensa;
