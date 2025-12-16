import React, { useCallback } from 'react';
import { Button } from '../../../../components/ui/Button';
import { FiLogOut } from 'react-icons/fi';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { IoMdAddCircle } from 'react-icons/io';
import { FaCircleQuestion, FaGraduationCap } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { Caso } from '../../../../common/models/caso/caso';
import { useNavigate } from 'react-router-dom';
import { SeparadorAcoes } from './styles';
import { iniciarIntervencao } from '../../../../common/api/casos/intervencao/iniciar-intervencao';
import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function BotoesAcoesInvestigacao() {
    const { caso } = useCasoSelecionado();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const iniciarIntervencaoMutation = useMutation({
        mutationFn: () => iniciarIntervencao(caso.id),
        onSuccess: async () => {
            // Invalida a query do caso para atualizar o status
            await queryClient.invalidateQueries({ queryKey: ['caso', String(caso.id)] });
            await Swal.fire({
                title: 'Sucesso!',
                text: 'Intervenção iniciada com sucesso!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            // Recarrega a página para atualizar o contexto
            window.location.reload();
        },
        onError: (error: unknown) => {
            const errorMessage =
                (error as { response?: { data?: { message?: string } } })?.response?.data
                    ?.message || 'Erro ao iniciar intervenção';
            Swal.fire({
                title: 'Erro!',
                text: errorMessage,
                icon: 'error'
            });
        }
    });

    const handleIniciarIntervencao = async () => {
        const result = await Swal.fire({
            title: 'Iniciar Intervenção?',
            text: 'Tem certeza que deseja iniciar a intervenção deste caso?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, iniciar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            iniciarIntervencaoMutation.mutate();
        }
    };

    return (
        <SeparadorAcoes>
            <Button action={() => console.log(caso)}>
                <FaCircleQuestion />
                Ajuda com o caso
            </Button>
            <Button action={() => console.log(caso)}>
                <FaGraduationCap />
                Formação
            </Button>
            <Button action={handleIniciarIntervencao}>
                <FaSearch />
                Iniciar Intervenção
            </Button>
        </SeparadorAcoes>
    );
}

export default function AcoesInvestigacao() {
    return (
        <BoxContainer titulo="Ações de Investigação" acoesContainer={BotoesAcoesInvestigacao}>
            {''}
        </BoxContainer>
    );
}
