import React from 'react';
import { SeparadorAcoes } from './styles';
import { Button } from '../../../../components/ui/Button';
import { FaCircleQuestion, FaGraduationCap, FaMap } from 'react-icons/fa6';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { useQueryClient } from '@tanstack/react-query';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { iniciarPlanejamento } from '../../../../common/api/casos/grupo-trabalho/iniciar-planejamento';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function BotoesAcoesPreparacao() {
    const { caso } = useCasoSelecionado();
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    const handleIniciarPlanejamento = async () => {
        const confirm = await Swal.fire({
            title: 'Iniciar Planejamento?',
            text: 'O status do caso será alterado para Em Planejamento.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, iniciar',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return;

        try {
            await iniciarPlanejamento(caso.id);
            await queryClient.invalidateQueries({ queryKey: ['caso', id] });
            Swal.fire({
                title: 'Planejamento iniciado!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } catch {
            Swal.fire({
                text: 'Erro ao iniciar planejamento.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        }
    };

    return (
        <SeparadorAcoes>
            <Button action={() => (window.location.href = 'mailto:testando@teste.com')}>
                <FaCircleQuestion />
                Ajuda com o caso
            </Button>
            <Button>
                <FaGraduationCap />
                Formações
            </Button>
            <Button action={handleIniciarPlanejamento}>
                <FaMap />
                Iniciar planejamento
            </Button>
        </SeparadorAcoes>
    );
}

export default function AcoesPreparacao() {
    return (
        <BoxContainer titulo="Ações de Preparação" acoesContainer={BotoesAcoesPreparacao}>
            {''}
        </BoxContainer>
    );
}
