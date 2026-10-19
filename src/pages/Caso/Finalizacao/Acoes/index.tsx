import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaCommentAlt, FaFileAlt, FaGavel, FaShieldAlt } from 'react-icons/fa';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { Button } from '../../../../components/ui/Button';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import {
    buscarRelatorioFinalizacao,
    StatusRelatorioFinalizacaoEnum,
    submeterRelatorioFinalizacaoAoGT
} from '../../../../common/api/casos/finalizacao/relatorio-finalizacao';
import { SeparadorAcoes } from './styles';

function BotoesAcoesFinalizacao() {
    const { caso } = useCasoSelecionado();
    const queryClient = useQueryClient();

    const { data: relatorio } = useQuery({
        queryKey: ['relatorio-finalizacao', caso.id],
        queryFn: () => buscarRelatorioFinalizacao(caso.id)
    });

    const handleSubmeterAoGT = async () => {
        const confirm = await Swal.fire({
            title: 'Submeter ao GT?',
            text: 'O relatório passará para o estado de revisão.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, submeter',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return;

        try {
            await submeterRelatorioFinalizacaoAoGT(caso.id);
            await queryClient.invalidateQueries({ queryKey: ['relatorio-finalizacao', caso.id] });
            Swal.fire({
                title: 'Relatório submetido ao GT!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } catch {
            Swal.fire({
                text: 'Erro ao submeter relatório ao GT.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        }
    };

    return (
        <SeparadorAcoes>
            <Button>
                <FaFileAlt />
                Rever Termo
            </Button>
            <Button
                action={handleSubmeterAoGT}
                disabled={relatorio?.status !== StatusRelatorioFinalizacaoEnum.RASCUNHO}>
                <FaGavel />
                Submeter ao GT
            </Button>
            <Button>
                <FaCommentAlt />
                Comentários
            </Button>
            <Button>
                <FaShieldAlt />
                Finalizar Caso
            </Button>
        </SeparadorAcoes>
    );
}

export default function AcoesFinalizacao() {
    return (
        <BoxContainer titulo="Ações de Finalização" acoesContainer={BotoesAcoesFinalizacao}>
            {''}
        </BoxContainer>
    );
}
