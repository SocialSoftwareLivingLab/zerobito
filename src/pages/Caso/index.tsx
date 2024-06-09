import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Outlet, matchRoutes, useLocation, useParams } from 'react-router-dom';
import { buscarCaso } from '../../common/api/casos/consultar-caso';
import { CasoInfo } from '../../components/Caso/CasoInfo';
import { CasoNavegacao } from '../../components/Caso/CasoNavegacao';
import Header from '../../components/Page-Header';
import { CasoSelecionadoContextProvider } from '../../contexts/caso-selecionado';
import { CasoContent, CasoHeader } from './styles';
import { tituloPaginas } from './titulo-paginas';

export default function Caso() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading } = useQuery({
        queryKey: ['caso', id],
        queryFn: () => buscarCaso(Number(id))
    });

    const location = useLocation();

    const [matchedRoute] = matchRoutes(tituloPaginas, location);

    return (
        <>
            <Header titulo={matchedRoute.route.titulo} explicacao={matchedRoute.route.explicacao} />

            {isLoading && <div>Carregando...</div>}

            {!isLoading && (
                <CasoSelecionadoContextProvider caso={data}>
                    <CasoHeader>
                        <CasoInfo />
                        <CasoNavegacao />
                    </CasoHeader>
                    <CasoContent>
                        <Outlet />
                    </CasoContent>
                </CasoSelecionadoContextProvider>
            )}
        </>
    );
}
