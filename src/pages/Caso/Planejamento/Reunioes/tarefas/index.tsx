import React, { useState } from 'react';
import { MembroGrupoTrabalho } from '../../../../../common/models/caso/grupo-trabalho/membro';
import { ColunaAcao } from '../../Tarefas/styles';
import { Button } from '../../../../../components/ui/Button';
import { useCasoSelecionado } from '../../../../../contexts/caso-selecionado';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { buscarMembrosGrupo } from '../../../../../common/api/casos/grupo-trabalho/consultar-membros-grupo';
import ConvidarMembroGrupoModal, {
    ConvidarMembroGrupoFormData
} from '../../../../../components/Caso/GrupoTrabalho/ConvidarMembroGrupoModal';
import { enviarConviteMembroGrupo } from '../../../../../common/api/casos/grupo-trabalho/enviar-convite';
import Swal from 'sweetalert2';
import { BoxContainer } from '../../../../../components/ui/BoxContainer';
import { FaUserPlus } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import { dataTableStyle } from '../../../../../components/Tabelas/custom';
import { COLUNAS_MEMBROS } from './tebela-membors-grupo';

export function AcoesLinha({ row }: { row: MembroGrupoTrabalho }) {
    return (
        <ColunaAcao>
            <Button>Aceitar</Button>
        </ColunaAcao>
    );
}

export default function TarefasReuniao() {
    const { caso } = useCasoSelecionado();

    const { data, isLoading } = useQuery({
        queryKey: ['casos', 'membros-grupo-trabalho'],
        queryFn: () => buscarMembrosGrupo(caso.id)
    });

    const queryClient = useQueryClient();

    const enviarConviteMutation = useMutation({
        mutationFn: (data: ConvidarMembroGrupoFormData) => {
            return enviarConviteMembroGrupo(caso.id, {
                motivo: data.motivo,
                convidado: {
                    nome: data.nome,
                    email: data.email
                }
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['casos', 'membros-grupo-trabalho'] });
            setModalConvidarAberto(false);
            await Swal.fire({
                title: 'Convite enviado!',
                text: 'Foi enviado um convite para participação ao grupo de trabalho para o e-mail informado',
                icon: 'success',
                timer: 4000,
                confirmButtonText: 'Continuar'
            });
        }
    });

    const [isModalConvidarAberto, setModalConvidarAberto] = useState(false);

    return (
        <BoxContainer
            titulo="Tarefas"
            acoesContainer={() => (
                <Button action={() => setModalConvidarAberto(true)}>
                    <FaUserPlus />
                    Convidar
                </Button>
            )}>
            <DataTable
                data={data ?? []}
                progressPending={isLoading}
                progressComponent="Carregando..."
                noDataComponent="Nenhum membro foi encontrado"
                columns={COLUNAS_MEMBROS}
                customStyles={dataTableStyle}></DataTable>
            <ConvidarMembroGrupoModal
                aberto={isModalConvidarAberto}
                handleFecharModal={() => setModalConvidarAberto(false)}
                onSubmit={(data) => enviarConviteMutation.mutateAsync(data)}
            />
        </BoxContainer>
    );
}
