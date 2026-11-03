import { FinalizacaoContainer } from './styles';
import AcoesFinalizacao from './Acoes';
import AtoresFinalizacao from './Atores';
import StatusFinalizacao from './Status';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { usePermissoesFinalizacao } from './use-permissoes-finalizacao';
import { MENSAGEM_BLOQUEIO_FINALIZACAO, useAcessoFinalizacao } from './use-acesso-finalizacao';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';

export default function Finalizacao() {
    const { caso } = useCasoSelecionado();
    const { podeEditar } = usePermissoesFinalizacao();
    const { liberado, carregando, motivo } = useAcessoFinalizacao();

    if (carregando) return <p>Carregando...</p>;

    if (!liberado) {
        Swal.fire({
            text: MENSAGEM_BLOQUEIO_FINALIZACAO[motivo ?? 'sem-permissao'],
            icon: 'error',
            timer: 2000,
            showConfirmButton: false,
            position: 'center',
            toast: true
        });

        return <Navigate to={`/casos/${caso.id}/dossie`} replace />;
    }

    return (
        <FinalizacaoContainer>
            <StatusFinalizacao />
            {podeEditar && <AcoesFinalizacao />}
            <AtoresFinalizacao />
        </FinalizacaoContainer>
    );
}
