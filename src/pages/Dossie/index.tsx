import React from 'react';
import { useParams } from 'react-router-dom';
import { DossieCard } from '../../components/DossieCard';
import Header from '../../components/Page-Header';
import { BoxContainer } from '../../components/ui/BoxContainer';
import { ColumnContainer } from '../../components/ui/ColumnContainer';
import { DossieContainer } from '../../components/ui/DossieContainer';
import { DossieBarContainer, OcorrenciaStep } from '../../components/ui/DossieItemBar';
import { DossieNavContainer } from '../../components/ui/DossieNavBar';

import { useQuery } from '@tanstack/react-query';

import './style.css';
import { buscarCaso } from '../../common/api/casos/consultar-caso';

const step: OcorrenciaStep = {
    step: 'Dossiê'
};

const Dossie = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading } = useQuery({
        queryKey: ['caso', id],
        queryFn: () => buscarCaso(Number(id))
    });

    return (
        <div>
            <Header
                title="Dossiê"
                explicacao="Aqui o cordenador local tem uma visão global do caso. Pode dar inicio à Preparação/Reunião de Trabalho
                e Qualificar a documentação"
            />

            {isLoading && <div>Carregando...</div>}
            {!isLoading && (
                <>
                    <DossieNavContainer caso={data} />
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
                </>
            )}
        </div>
    );
};

export default Dossie;
