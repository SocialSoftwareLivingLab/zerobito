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
import Swal from 'sweetalert2';

export default function Caso() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    // Dados do usuário
    const { data: usuario } = useUsuarioAutenticado();

    // Carrega caso
    const { data: caso, isPending: isLoadingCaso } = useQuery({
        queryKey: ['caso', id],
        queryFn: () => buscarCaso(Number(id)),
        enabled: !!id
    });

    // Carrega membros do grupo do caso
    const { data: membros, isPending: isLoadingMembros } = useQuery({
        queryKey: ['membrosCaso', id],
        queryFn: () => buscarMembrosGrupo(Number(id)),
        enabled: !!id
    });

    // Carrega perfis do usuário
    const { data: perfis = [], isPending: isLoadingPerfis } = useQuery({
        queryKey: ['usuario', 'perfis'],
        queryFn: obterPerfisUsuario
    });

    // Rotas para título/descrição
    const [matchedRoute] = matchRoutes(tituloPaginas, location);

    // Aguarda TODAS as queries
    const carregando = isLoadingCaso || isLoadingMembros || isLoadingPerfis;

    if (carregando) {
        return <div>Carregando...</div>;
    }

    // Verifica permissão SOMENTE depois que tudo carregou
    const ehMembro = perfis.some((p) => p.caso?.id === caso?.id);

    if (!ehMembro) {
        Swal.fire({
            text: 'Este perfil não tem permissão para entrar no caso.',
            icon: 'error',
            timer: 2000,
            toast: true,
            position: 'center',
            showConfirmButton: false
        });

        return <Navigate to="/" replace />;
    }

    return (
        <>
            <Header titulo={matchedRoute.route.titulo} explicacao={matchedRoute.route.explicacao} />

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
        </>
    );
}
