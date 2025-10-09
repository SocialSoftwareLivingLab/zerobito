import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Outlet, matchRoutes, useLocation, useParams, Navigate } from 'react-router-dom';
import { buscarCaso } from '../../common/api/casos/consultar-caso';
import { CasoInfo } from '../../components/Caso/CasoInfo';
import { CasoNavegacao } from '../../components/Caso/CasoNavegacao';
import Header from '../../components/Page-Header';
import { CasoSelecionadoContextProvider } from '../../contexts/caso-selecionado';
import { CasoContent, CasoHeader } from './styles';
import { tituloPaginas } from './titulo-paginas';
import { TarefasProvider } from '../../contexts/minhas-tarefas';
import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';
import { buscarMembrosGrupo } from '../../common/api/casos/grupo-trabalho/consultar-membros-grupo';
import { obterPerfisUsuario } from '../../common/api/usuarios/permissoes/permissoes-user';

export default function Caso() {
    const { id } = useParams<{ id: string }>();
    const { data: usuario } = useUsuarioAutenticado();

    const { data: caso, isLoading: isLoadingCaso } = useQuery({
        queryKey: ['caso', id],
        queryFn: () => buscarCaso(Number(id)),
        enabled: !!id
    });

    const { data: membros, isLoading: isLoadingMembros } = useQuery({
        queryKey: ['membrosCaso', id],
        queryFn: () => buscarMembrosGrupo(Number(id)),
        enabled: !!id
    });

    const location = useLocation();
    const [matchedRoute] = matchRoutes(tituloPaginas, location);

    const { data: perfis = [] } = useQuery({
        queryKey: ['usuario', 'perfis'],
        queryFn: obterPerfisUsuario
    });
    console.log('perfis:');
    console.log(perfis);

    // Evita rodar a lógica antes de tudo estar carregado
    if (isLoadingCaso || isLoadingMembros) {
        return <div>Carregando...</div>;
    }

    const ehMembro = perfis?.some((p) => p.caso?.id === caso?.id);

    // 🔒 Redireciona só depois de termos os dados
    if (!ehMembro && !isLoadingMembros && !isLoadingCaso) {
        alert('Este perfil não tem permissão para entrar no caso.');
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <Header titulo={matchedRoute.route.titulo} explicacao={matchedRoute.route.explicacao} />

            {(isLoadingCaso || isLoadingMembros) && <div>Carregando...</div>}

            {!isLoadingCaso && !isLoadingMembros && (
                <CasoSelecionadoContextProvider caso={caso}>
                    <TarefasProvider>
                        <CasoHeader>
                            <CasoInfo />
                            <CasoNavegacao />
                        </CasoHeader>
                        <CasoContent>
                            <Outlet />
                        </CasoContent>
                    </TarefasProvider>
                </CasoSelecionadoContextProvider>
            )}
        </>
    );
}
