import React from 'react';
import './style.css';
import Header from '../../components/Page-Header';
import { BoxContainer } from '../../components/ui/BoxContainer';
import { Button } from '../../components/ui/Button';
import { DossieNavContainer } from '../../components/ui/DossieNavBar';
import { DossieBarContainer, OcorrenciaStep } from '../../components/ui/DossieItemBar';
import { DossieContainer } from '../../components/ui/DossieContainer';

const step: OcorrenciaStep = {
    step: 'Dossiê'
};

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
                <BoxContainer titulo={'Digite infos'}>
                    <span>Infos</span>
                </BoxContainer>
                <BoxContainer titulo={'Digite infos'}>
                    <span>Infos</span>
                </BoxContainer>
                <BoxContainer titulo={'Digite infos'}>
                    <span>Infos</span>
                </BoxContainer>
            </DossieContainer>
        </div>
    );
};

export default Imprensa;
