import { useQuery } from '@tanstack/react-query';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import {
    buscarRelatorioFinalizacao,
    StatusRelatorioFinalizacaoEnum
} from '../../../common/api/casos/finalizacao/relatorio-finalizacao';
import { usePapelNoCaso } from './use-papel-no-caso';

/**
 * Membros do grupo de trabalho só acessam a finalização depois que o
 * relatório é submetido ao GT. Para os demais perfis o acesso é livre.
 */
export function useAcessoFinalizacao(habilitado = true): {
    liberado: boolean;
    carregando: boolean;
} {
    const { caso } = useCasoSelecionado();
    const ehMembroGrupoTrabalho = usePapelNoCaso() === 'membro';

    const { data: relatorio, isLoading } = useQuery({
        queryKey: ['relatorio-finalizacao', caso.id],
        queryFn: () => buscarRelatorioFinalizacao(caso.id),
        enabled: habilitado && ehMembroGrupoTrabalho,
        retry: false
    });

    if (!ehMembroGrupoTrabalho) return { liberado: true, carregando: false };

    return {
        liberado: !!relatorio && relatorio.status !== StatusRelatorioFinalizacaoEnum.RASCUNHO,
        carregando: habilitado && isLoading
    };
}
