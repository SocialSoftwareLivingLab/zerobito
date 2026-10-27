import { useQuery } from '@tanstack/react-query';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import {
    buscarRelatorioFinalizacao,
    StatusRelatorioFinalizacaoEnum
} from '../../../common/api/casos/finalizacao/relatorio-finalizacao';
import { usePermissoesFinalizacao } from './use-permissoes-finalizacao';

export type MotivoBloqueioFinalizacao = 'sem-permissao' | 'aguardando-submissao' | null;

export const MENSAGEM_BLOQUEIO_FINALIZACAO: Record<
    Exclude<MotivoBloqueioFinalizacao, null>,
    string
> = {
    'sem-permissao': 'Você não tem permissão para acessar a finalização deste caso.',
    'aguardando-submissao':
        'A finalização estará disponível quando o relatório for submetido ao GT.'
};

/**
 * Quem pode editar o relatório acessa a finalização sempre. Quem só pode
 * visualizá-lo (ex.: membros do GT) acessa depois que ele é submetido ao GT.
 */
export function useAcessoFinalizacao(habilitado = true): {
    liberado: boolean;
    carregando: boolean;
    motivo: MotivoBloqueioFinalizacao;
} {
    const { caso } = useCasoSelecionado();
    const {
        podeVisualizar,
        podeEditar,
        carregando: carregandoPermissoes
    } = usePermissoesFinalizacao();

    const precisaDoRelatorio = habilitado && podeVisualizar && !podeEditar;

    const { data: relatorio, isLoading } = useQuery({
        queryKey: ['relatorio-finalizacao', caso.id],
        queryFn: () => buscarRelatorioFinalizacao(caso.id),
        enabled: precisaDoRelatorio,
        retry: false
    });

    if (carregandoPermissoes) return { liberado: false, carregando: true, motivo: null };
    if (podeEditar) return { liberado: true, carregando: false, motivo: null };
    if (!podeVisualizar) return { liberado: false, carregando: false, motivo: 'sem-permissao' };

    const submetido = !!relatorio && relatorio.status !== StatusRelatorioFinalizacaoEnum.RASCUNHO;

    return {
        liberado: submetido,
        carregando: precisaDoRelatorio && isLoading,
        motivo: submetido ? null : 'aguardando-submissao'
    };
}
