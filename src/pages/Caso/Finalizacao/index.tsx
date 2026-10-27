import { FinalizacaoContainer } from './styles';
import AcoesFinalizacao from './Acoes';
import AtoresFinalizacao from './Atores';
import StatusFinalizacao from './Status';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { usePapelNoCaso } from './use-papel-no-caso';
import { useAcessoFinalizacao } from './use-acesso-finalizacao';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';

export default function Finalizacao() {
    const { caso } = useCasoSelecionado();
    const papel = usePapelNoCaso();
    const { liberado, carregando } = useAcessoFinalizacao();

    if (carregando) return <p>Carregando...</p>;

    if (!liberado) {
        Swal.fire({
            text: 'A finalização estará disponível quando o relatório for submetido ao GT.',
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
            {papel === 'coordenador' && <AcoesFinalizacao />}
            <AtoresFinalizacao />
        </FinalizacaoContainer>
    );
}
