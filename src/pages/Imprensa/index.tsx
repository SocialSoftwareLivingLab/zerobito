import React from 'react';
import { DossieCard } from '../../components/DossieCard';
import Header from '../../components/Page-Header';
import { BoxContainer } from '../../components/ui/BoxContainer';
import { ColumnContainer } from '../../components/ui/ColumnContainer';
import { DossieContainer } from '../../components/ui/DossieContainer';
import { DossieBarContainer, OcorrenciaStep } from '../../components/ui/DossieItemBar';
import { DossieNavContainer } from '../../components/ui/DossieNavBar';
import './style.css';
import { Link } from 'react-router-dom';

const step: OcorrenciaStep = {
    step: 'Dossiê'
};
const data: string[] = ['0020', '17/03/2003', 'Aguardando', '8', 'meio dia'];

const Imprensa = () => {
    const casos = [
        { data: '17/03/2003', id: 1 },
        { data: '16/03/2003', id: 1 }
    ];
    return (
        <div>
            {casos.map((caso) => (
                <Link key={caso.id} to={`/${caso.id}`}>
                    {caso.data}
                </Link>
            ))}
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
                    <DossieCard
                        data={data}
                        palavras={[
                            'trabalho',
                            'acidente',
                            'exercicio',
                            'unicamp',
                            'nome',
                            'beneficio'
                        ]}></DossieCard>
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
