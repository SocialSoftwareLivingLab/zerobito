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

    // 🔒 1) Checando permissões do usuário
    const temPermissaoVerTodos = usuario?.perfil?.permissoes?.includes(
        'ocorrencias:visualizar-todos'
    );

    // 🔒 2) Checando se usuário é membro do caso
    const ehMembro = membros?.some((m) => m.usuarioId === usuario?.id);

    // 🔒 3) Se não tem permissão nem é membro → redireciona pra home
    if (!temPermissaoVerTodos && !ehMembro && !isLoadingMembros) {
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
