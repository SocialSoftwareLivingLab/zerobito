import React from 'react';
import { SeparadorAcoes } from './styles';
import { Button } from '../../../../components/ui/Button';
import { FaCircleQuestion, FaGraduationCap, FaMap } from 'react-icons/fa6';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { iniciarPlanejamento } from '../../../../common/api/casos/grupo-trabalho/iniciar-planejamento';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { buscarCaso } from '../../../../common/api/casos/consultar-caso';

function BotoesAcoesPreparacao() {
    const { caso } = useCasoSelecionado();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useQuery({
        queryKey: ['caso', id],
        queryFn: () => buscarCaso(Number(id))
    });

    const queryClient = useQueryClient();

    const iniciarPlanejamentoMutation = useMutation({
        mutationFn: () => {
            console.log('Entrou na mutation');
            if (caso.status !== 'EM_PREPARACAO') {
                // Lança um erro se a condição não for atendida
                if (caso.status === 'Em Planejamento') {
                    alert('O caso já está em planejamento');
                } else {
                    alert('O planejamento só pode ser iniciado se o caso estiver em preparação');
                }
                return Promise.resolve();
            }
            Swal.fire({
                title: 'Planejamento iniciado!',
                text: 'A aba de planejamento agora está disponível',
                icon: 'success',
                timer: 4000,
                confirmButtonText: 'Continuar'
            });
            return iniciarPlanejamento(caso.id);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['caso'] });
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
