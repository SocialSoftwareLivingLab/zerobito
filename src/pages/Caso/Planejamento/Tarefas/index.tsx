import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
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
import { buscarTarefasMembro } from '../../../../common/api/casos/grupo-trabalho/tarefas-membro';

interface Tarefa {
    nome: string;
    status: string;
}

export interface MembroGrupo {
    id: number;
    identificador: string;
    nome: string;
    email: string;
    status: {
        codigo: string;
        nome: string;
    };
    tarefasCount: number;
}

const sampleTarefa: Tarefa[] = [
    { nome: 'Task 1', status: 'Aceito' },
    { nome: 'Task 2', status: 'Em andamento' },
    { nome: 'Task 3', status: 'Atrasado' }
];
// Columns for tarefas DataTable
const TAREFAS_COLUMNS: TableColumn<Tarefa>[] = [
    {
        selector: (row) => row.nome,
        sortable: true,
        grow: 1.17
    },
    {
        selector: (row) => row.status,
        sortable: true
    }
];

// Expandable row component with inner DataTable
interface ExpandableRowProps {
    data: Tarefa[];
}

const ExpandableRowComponent: React.FC<{ id: number }> = ({ id }) => {
    const { caso } = useCasoSelecionado();
    const [isModalEditarAberto, setModalEditar] = useState(false);

    const abrirModal = (row: Tarefa) => setModalEditar(true);

    const { data: tarefas = [], isLoading } = useQuery({
        queryKey: ['tarefas', caso.id, id],
        queryFn: () => buscarTarefasMembro(caso.id, id),
        select: (result) =>
            result.map((tarefa) => ({
                ...tarefa,
                status: tarefa.status.nome // transforma status em string
            }))
    });

    return (
        <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
            {isLoading ? (
                <div>Carregando tarefas...</div>
            ) : (
                <DataTable
                    data={tarefas}
                    columns={TAREFAS_COLUMNS}
                    customStyles={dataTableStyle}
                    noDataComponent="Nenhuma tarefa encontrada"
                    onRowClicked={abrirModal}
                    noHeader
                    noTableHead
                />
            )}
            <EditarTarefaGrupoModal
                aberto={isModalEditarAberto}
                handleFecharModal={() => setModalEditar(false)}
            />
        </div>
    );
};

export default function AtoresReuniao() {
    const { caso } = useCasoSelecionado();
    const queryClient = useQueryClient();

    const { data: membrosWithTaskCount = [], isLoading } = useQuery({
        queryKey: ['casos', 'membros-grupo-trabalho-com-tarefas', caso.id],
        queryFn: async () => {
            const membros = await buscarMembrosGrupo(caso.id);
            const membrosComTarefas = await Promise.all(
                membros.map(async (membro) => {
                    try {
                        const tarefas = await buscarTarefasMembro(caso.id, membro.id);
                        return {
                            ...membro,
                            tarefasCount: tarefas.length
                        };
                    } catch (error) {
                        console.error(`Erro ao buscar tarefas do membro ${membro.id}:`, error);
                        return {
                            ...membro,
                            tarefasCount: 0
                        };
                    }
                })
            );
            return membrosComTarefas;
        }
    });

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
            await queryClient.invalidateQueries({
                queryKey: ['casos', 'membros-grupo-trabalho-com-tarefas', caso.id]
            });
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
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['casos', 'membros-grupo-trabalho-com-tarefas', caso.id]
            });
            await queryClient.invalidateQueries({
                queryKey: ['tarefas', caso.id],
                exact: false
            });
            await Swal.fire({
                title: 'Tarefa registrada!',
                text: 'Uma nova tarefa foi registrada com sucesso.',
                icon: 'success',
                timer: 4000,
                confirmButtonText: 'Continuar'
            });
        }
    });

    const [isModalConvidarAberto, setModalConvidarAberto] = useState(false);
    const [isModalTarefaAberto, setModalTarefa] = useState(false);

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
                data={membrosWithTaskCount ?? []}
                progressPending={isLoading}
                progressComponent="Carregando..."
                noDataComponent="Nenhum membro foi encontrado"
                columns={COLUNAS_MEMBROS_GRUPO_TRABALHO}
                customStyles={dataTableStyle}
                expandableRows
                expandOnRowClicked
                expandableRowsComponent={({ data }) => <ExpandableRowComponent id={data.id} />}
            />
            <ConvidarMembroGrupoModal
                aberto={isModalConvidarAberto}
                handleFecharModal={() => setModalConvidarAberto(false)}
                onSubmit={(data) => enviarConviteMutation.mutateAsync(data)}
            />
            <RegistrarTarefaGrupoModal
                aberto={isModalTarefaAberto}
                handleFecharModal={() => setModalTarefa(false)}
                onSubmit={async (data) => {
                    enviarTarefaMutation.mutateAsync(data);
                    setModalTarefa(false);
                }}
            />
        </BoxContainer>
    );
}
