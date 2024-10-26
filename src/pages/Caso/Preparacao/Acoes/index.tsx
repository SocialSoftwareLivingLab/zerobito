import React from 'react';
import { SeparadorAcoes } from './styles';
import { Button } from '../../../../components/ui/Button';
import { FaCircleQuestion, FaGraduationCap, FaMap } from 'react-icons/fa6';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { useMutation } from '@tanstack/react-query';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { iniciarPlanejamento } from '../../../../common/api/casos/grupo-trabalho/iniciar-planejamento';
import Swal from 'sweetalert2';

function BotoesAcoesPreparacao() {
    const { caso } = useCasoSelecionado();

    const iniciarPlanejamentoMutation = useMutation({
        mutationFn: () => {
            console.log('Entrou na mutation');
            if (caso.status !== 'EM_PREPARACAO') {
                // Lança um erro se a condição não for atendida
                throw new Error(
                    'O planejamento só pode ser iniciado se o caso estiver em preparação.'
                );
            }
            return iniciarPlanejamento(caso.id);
        },
        onSuccess: async () => {
            await Swal.fire({
                title: 'Planejamento iniciado!',
                text: 'A aba de planejamento agora está disponível',
                icon: 'success',
                timer: 4000,
                confirmButtonText: 'Continuar'
            });
        },
        onError: () => {
            if (caso.status === 'Em Planejamento') {
                alert('O planejamento só pode ser iniciado se o caso estiver em preparação');
            } else {
                alert('O planejamento só pode ser iniciado se o caso estiver em preparação');
            }
        }
    });

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
            <Button action={() => iniciarPlanejamentoMutation.mutateAsync()}>
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
