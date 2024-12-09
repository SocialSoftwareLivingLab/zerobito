import React, { useCallback, useState } from 'react';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { Button } from '../../../../components/ui/Button';
import { FaUserPlus } from 'react-icons/fa6';
import DataTable, { TableColumn } from 'react-data-table-component';
import { dataTableStyle } from '../../../../components/Tabelas/custom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { buscarMembrosGrupo } from '../../../../common/api/casos/grupo-trabalho/consultar-membros-grupo';
import ConvidarMembroGrupoModal, {
    ConvidarMembroGrupoFormData
} from '../../../../components/Caso/GrupoTrabalho/ConvidarMembroGrupoModal';
import { enviarConviteMembroGrupo } from '../../../../common/api/casos/grupo-trabalho/enviar-convite';
import Swal from 'sweetalert2';
import { COLUNAS_MEMBROS_GRUPO_TRABALHO } from './tabela-membros-grupo';
import { MembroGrupoTrabalho } from '../../../../common/models/caso/grupo-trabalho/membro';
import { ColunaAcao } from './styles';
import EditarTarefaGrupoModal from '../../../../components/Caso/GrupoTrabalho/EditarTarefaModal';
import RegistrarTarefaGrupoModalView from '../../../../components/Caso/GrupoTrabalho/RegistrarTarefaModal/view';
import RegistrarTarefaGrupoModal, {
    RegistrarTarefaGrupoModalFormData
} from '../../../../components/Caso/GrupoTrabalho/RegistrarTarefaModal';
import { RegistrarTarefaMembroGrupo } from '../../../../common/api/casos/grupo-trabalho/registrar-tarefa';

export function AcoesLinha({ row }: { row: MembroGrupoTrabalho }) {
    return (
        <ColunaAcao>
            <Button>Aceitar</Button>
        </ColunaAcao>
    );
}

export default function AtoresReuniao() {
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

    const enviarTarefaMutation = useMutation({
        mutationFn: (data: RegistrarTarefaGrupoModalFormData) => {
            return RegistrarTarefaMembroGrupo(caso.id, {
                nomeMembro: data.responsavel,
                comentario: data.comentario,
                nome: data.nome,
                prazo: data.prazo
            });
        }
    });

    const [isModalConvidarAberto, setModalConvidarAberto] = useState(false);

    const [isModalEditarAberto, setModalEditar] = useState(false);
    const [isModalTarefaAberto, setModalTarefa] = useState(false);

    const abrirModal = (row: MembroGrupoTrabalho) => setModalEditar(true);

    return (
        <BoxContainer
            titulo="Atores / Situação das ações"
            acoesContainer={() => (
                <div>
                    <Button action={() => setModalConvidarAberto(true)}>
                        <FaUserPlus />
                        Convidar
                    </Button>
                    <Button action={() => setModalTarefa(true)}>
                        <FaUserPlus />
                        Registrar Tarefa
                    </Button>
                </div>
            )}>
            <DataTable
                data={data ?? []}
                progressPending={isLoading}
                progressComponent="Carregando..."
                noDataComponent="Nenhum membro foi encontrado"
                columns={COLUNAS_MEMBROS_GRUPO_TRABALHO}
                customStyles={dataTableStyle}
                onRowClicked={abrirModal}></DataTable>
            <ConvidarMembroGrupoModal
                aberto={isModalConvidarAberto}
                handleFecharModal={() => setModalConvidarAberto(false)}
                onSubmit={(data) => enviarConviteMutation.mutateAsync(data)}
            />
            <EditarTarefaGrupoModal
                aberto={isModalEditarAberto}
                handleFecharModal={() => setModalEditar(false)}
            />
            <RegistrarTarefaGrupoModal
                aberto={isModalTarefaAberto}
                handleFecharModal={() => setModalTarefa(false)}
                onSubmit={(data) => enviarTarefaMutation.mutateAsync(data)}
            />
        </BoxContainer>
    );
}
