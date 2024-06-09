import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { buscarCaso } from '../../common/api/casos/consultar-caso';
import { CasoInfo } from '../../components/Caso/CasoInfo';
import { CasoNavegacao } from '../../components/Caso/CasoNavegacao';
import Header from '../../components/Page-Header';
import { CasoSelecionadoContextProvider } from '../../contexts/caso-selecionado';
import DossiePage from './Dossie';
import { CasoContent, CasoHeader } from './styles';

export default function Caso() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading } = useQuery({
        queryKey: ['caso', id],
        queryFn: () => buscarCaso(Number(id))
    });

    return (
        <>
            <Header
                titulo="Dossiê"
                explicacao="Aqui o cordenador local tem uma visão global do caso. Pode dar inicio à Preparação/Reunião de Trabalho e Qualificar a documentação"
            />

            {isLoading && <div>Carregando...</div>}

            {!isLoading && (
                <CasoSelecionadoContextProvider caso={data}>
                    <CasoHeader>
                        <CasoInfo />
                        <CasoNavegacao />
                    </CasoHeader>
                    <CasoContent>
                        {/* <Outlet /> */}
                        <DossiePage />
                    </CasoContent>
                </CasoSelecionadoContextProvider>
            )}
        </>
    );
}
