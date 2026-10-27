import { useQuery } from '@tanstack/react-query';
import { obterPerfisUsuario } from '../../../common/api/usuarios/permissoes/permissoes-user';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { useUsuarioAutenticado } from '../../../contexts/usuario-autenticado';

export type PapelNoCaso = 'coordenador' | 'membro' | null;

/** Papel do usuário logado no caso selecionado, conforme o perfil vinculado ao caso. */
export function usePapelNoCaso(): PapelNoCaso {
    const { caso } = useCasoSelecionado();
    const { data: usuario } = useUsuarioAutenticado();

    // A chave inclui o usuário para não reaproveitar perfis de outra sessão na mesma aba.
    const { data: perfis = [] } = useQuery({
        queryKey: ['usuario', usuario?.id, 'perfis'],
        queryFn: obterPerfisUsuario
    });

    const perfisNoCaso = perfis
        .filter((p) => String(p.caso?.id) === String(caso.id))
        .map((p) => p.perfil?.codigo);

    if (perfisNoCaso.includes('COORDENADOR_DE_CASO')) return 'coordenador';
    if (perfisNoCaso.includes('MEMBRO_CASO')) return 'membro';
    return null;
}
