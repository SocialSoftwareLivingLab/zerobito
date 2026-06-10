import React from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Button } from '../../../../components/ui/Button';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { FaCircleQuestion, FaGraduationCap } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { iniciarIntervencao } from '../../../../common/api/casos/intervencao/iniciar-intervencao';
import { SeparadorAcoes } from './styles';

function BotoesAcoesInvestigacao() {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    const handleIniciarIntervencao = async () => {
        const confirm = await Swal.fire({
            title: 'Iniciar Intervenção?',
            text: 'O status do caso será alterado para Em Intervenção.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, iniciar',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return;

        try {
            await iniciarIntervencao(Number(id));
            await queryClient.invalidateQueries({ queryKey: ['caso', id] });
            Swal.fire({
                title: 'Intervenção iniciada!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } catch {
            Swal.fire({
                text: 'Erro ao iniciar intervenção.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        }
    };

    return (
        <SeparadorAcoes>
            <Button action={() => console.log('ajuda')}>
                <FaCircleQuestion />
                Ajuda com o caso
            </Button>
            <Button action={() => console.log('formacao')}>
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
