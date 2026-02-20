import React, { useCallback } from 'react';
import Swal from 'sweetalert2';
import { Button } from '../../../../components/ui/Button';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { SeparadorAcoes } from './styles';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { IoMdAddCircle } from 'react-icons/io';
import { FaCircleQuestion, FaGraduationCap } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import { Caso } from '../../../../common/models/caso/caso';
import { useNavigate } from 'react-router-dom';
import { finalizarIntervencao } from '../../../../common/api/casos/intervencao/finalizar-intervencao';

function BotoesAcoesReuniao() {
    const { caso } = useCasoSelecionado();
    const navigate = useNavigate();

    const onReunioesClick = useCallback(
        (caso: Caso) => {
            navigate(`/casos/${caso.id}/intervencao/reunioes`);
        },
        [navigate]
    );

    const onFinalizarIntervencao = useCallback(async () => {
        const confirmacao = await Swal.fire({
            title: 'Finalizar Intervenção',
            text: 'Tem certeza que deseja finalizar a intervenção deste caso? O status será alterado para Finalização.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sim, finalizar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacao.isConfirmed) {
            try {
                await finalizarIntervencao(caso.id);
                await Swal.fire({
                    title: 'Intervenção finalizada!',
                    text: 'O caso foi movido para a etapa de finalização com sucesso.',
                    icon: 'success',
                    timer: 4000,
                    confirmButtonText: 'Continuar'
                });
                navigate(`/casos/${caso.id}`);
            } catch (error: unknown) {
                const errorMessage =
                    (error as { response?: { data?: { message?: string } } })?.response?.data
                        ?.message ||
                    (error as Error).message ||
                    'Erro ao finalizar intervenção';
                Swal.fire({
                    title: 'Erro!',
                    text: errorMessage,
                    icon: 'error'
                });
            }
        }
    }, [caso.id, navigate]);

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
            <Button action={onFinalizarIntervencao}>
                <FaCheckCircle />
                Finalizar Intervenção
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
