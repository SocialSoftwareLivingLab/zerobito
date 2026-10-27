import { useQuery } from '@tanstack/react-query';
import { obterPermissoesUsuarioNoCaso } from '../../../common/api/usuarios/permissoes/permissoes-user';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { useUsuarioAutenticado } from '../../../contexts/usuario-autenticado';

/** Espelha as permissões de finalização definidas no PermissaoEnum do backend. */
export const PERMISSOES_FINALIZACAO = {
    VISUALIZAR: 'casos:visualizar-relatorio-finalizacao',
    EDITAR: 'casos:editar-relatorio-finalizacao',
    COMENTAR: 'casos:comentar-relatorio-finalizacao'
} as const;

export interface PermissoesFinalizacao {
    podeVisualizar: boolean;
    podeEditar: boolean;
    podeComentar: boolean;
    carregando: boolean;
}

/** Permissões de finalização do usuário logado, conforme o seu perfil no caso selecionado. */
export function usePermissoesFinalizacao(): PermissoesFinalizacao {
    const { caso } = useCasoSelecionado();
    const { data: usuario } = useUsuarioAutenticado();

    // A chave inclui o usuário para não reaproveitar permissões de outra sessão na mesma aba.
    const { data: permissoes = [], isLoading } = useQuery({
        queryKey: ['usuario', usuario?.id, 'permissoes-caso', caso.id],
        queryFn: () => obterPermissoesUsuarioNoCaso(caso.id)
    });

    return {
        podeVisualizar: permissoes.includes(PERMISSOES_FINALIZACAO.VISUALIZAR),
        podeEditar: permissoes.includes(PERMISSOES_FINALIZACAO.EDITAR),
        podeComentar: permissoes.includes(PERMISSOES_FINALIZACAO.COMENTAR),
        carregando: isLoading
    };
}
