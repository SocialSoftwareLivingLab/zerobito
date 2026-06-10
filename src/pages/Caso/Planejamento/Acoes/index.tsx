import React, { useCallback } from 'react';
import { Button } from '../../../../components/ui/Button';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { SeparadorAcoes } from './styles';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { IoMdAddCircle } from 'react-icons/io';
import { FaCircleQuestion, FaGraduationCap } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { Caso } from '../../../../common/models/caso/caso';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { iniciarInvestigacao } from '../../../../common/api/casos/planejamento/iniciar-investigacao';
import Swal from 'sweetalert2';

function BotoesAcoesReuniao() {
    const { caso } = useCasoSelecionado();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const onReunioesClick = useCallback(
        (caso: Caso) => {
            navigate(`/casos/${caso.id}/planejamento/reunioes`);
        },
        [navigate]
    );

    const handleIniciarInvestigacao = async () => {
        const confirm = await Swal.fire({
            title: 'Iniciar Investigação?',
            text: 'O status do caso será alterado para Em Investigação.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, iniciar',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return;

        try {
            await iniciarInvestigacao(caso.id);
            await queryClient.invalidateQueries({ queryKey: ['caso', id] });
            Swal.fire({
                title: 'Investigação iniciada!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } catch {
            Swal.fire({
                text: 'Erro ao iniciar investigação.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        }
    };

    return (
        <SeparadorAcoes>
            <Button action={() => onReunioesClick(caso)}>
                <IoMdAddCircle />
                Reuniões
            </Button>
            <Button action={() => console.log(caso)}>
                <FaCircleQuestion />
                Ajuda com o caso
            </Button>
            <Button action={() => console.log(caso)}>
                <FaGraduationCap />
                Formação
            </Button>
            <Button action={handleIniciarInvestigacao}>
                <FaSearch />
                Iniciar Investigação
            </Button>
        </SeparadorAcoes>
    );
}

export default function AcoesReuniao() {
    return (
        <BoxContainer titulo="Ações da Reunião" acoesContainer={BotoesAcoesReuniao}>
            {''}
        </BoxContainer>
    );
}
