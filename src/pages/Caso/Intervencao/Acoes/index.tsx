import React, { useCallback } from 'react';
import { Button } from '../../../../components/ui/Button';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { SeparadorAcoes } from './styles';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { IoMdAddCircle } from 'react-icons/io';
import { FaFlagCheckered } from 'react-icons/fa';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { podeFinalizarIntervencao } from '../../../../common/api/casos/intervencao/pode-finalizar-intervencao';
import { finalizarIntervencao } from '../../../../common/api/casos/intervencao/finalizar-intervencao';
import Swal from 'sweetalert2';

function BotoesAcoesIntervencao() {
    const { caso } = useCasoSelecionado();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    const basePath = location.pathname.replace(/\/intervencao.*$/, '');

    const handleFinalizar = useCallback(async () => {
        const pode = await podeFinalizarIntervencao(caso.id);

        if (!pode) {
            Swal.fire({
                text: 'Para finalizar é necessário ter ao menos uma ação concluída com êxito ou de forma satisfatória.',
                icon: 'warning',
                confirmButtonText: 'Entendido'
            });
            return;
        }

        const result = await Swal.fire({
            title: 'Finalizar Intervenção?',
            text: 'Esta ação marcará a fase de intervenção como concluída.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Finalizar',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;

        try {
            await finalizarIntervencao(caso.id);
            await queryClient.invalidateQueries({ queryKey: ['caso', id] });
            Swal.fire({
                title: 'Intervenção finalizada!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                text: 'Erro ao finalizar intervenção.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        }
    }, [caso.id, id, queryClient]);

    return (
        <SeparadorAcoes>
            <Button action={() => navigate(`${basePath}/intervencao/nova`)}>
                <IoMdAddCircle />
                Nova Intervenção
            </Button>
            <Button action={handleFinalizar}>
                <FaFlagCheckered />
                Finalizar Intervenção
            </Button>
        </SeparadorAcoes>
    );
}

export default function AcoesIntervencao() {
    return (
        <BoxContainer titulo="Ações de Intervenção" acoesContainer={BotoesAcoesIntervencao}>
            {''}
        </BoxContainer>
    );
}
