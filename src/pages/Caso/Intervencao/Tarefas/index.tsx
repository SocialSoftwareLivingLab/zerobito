import React, { useState } from 'react';
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
import EditarAcaoModal from './EditarAcaoModal';
import RegistrarAcaoModal, { RegistrarAcaoFormData } from './RegistrarAcaoModal';
import { buscarAcoesMembro } from '../../../../common/api/casos/intervencao/buscar-acoes';
import { criarAcao } from '../../../../common/api/casos/intervencao/criar-acao';
import Badge from '../../../../components/ui/Badge';

interface Acao {
    id: number;
    nome: string;
    status: string;
}

const TIPOS_STATUS: Record<
    string,
    { label: string; type: 'success' | 'danger' | 'warning' | 'info' }
> = {
    PENDENTE: {
        label: 'Pendente',
        type: 'warning'
    },
    EM_ANDAMENTO: {
        label: 'Em andamento',
        type: 'warning'
    },
    ATRASADA: {
        label: 'Atrasada',
        type: 'danger'
    },
    ATRASADO: {
        label: 'Atrasada',
        type: 'danger'
    },
    CANCELADA: {
        label: 'Cancelada',
        type: 'danger'
    },
    CONCLUIDA: {
        label: 'Concluída',
        type: 'success'
    },
    CONCLUÍDA: {
        label: 'Concluída',
        type: 'success'
    },
    CONCLUÍDA_COM_ÊXITO: {
        label: 'Concluída com êxito',
        type: 'success'
    },
    CONCLUÍDA_SATISFATÓRIA: {
        label: 'Concluída satisfatória',
        type: 'success'
    },
    CONCLUÍDA_PARCIAL: {
        label: 'Concluída parcial',
        type: 'info'
    },
    NÃO_CONCLUÍDA: {
        label: 'Não concluída',
        type: 'danger'
    },
    REALIZADO: {
        label: 'Concluído',
        type: 'success'
    },
    ACEITO: {
        label: 'Aceito',
        type: 'success'
    },
    MONITORANDO: {
        label: 'Monitorando',
        type: 'warning'
    },
    RECUSADO: {
        label: 'Recusado',
        type: 'danger'
    }
};

function normalizarChaveStatus(status: string): string {
    return status
        .toUpperCase()
        .replace(/\s+/g, '_')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export function BadgeStatusAcao({ status }: { status: string | null }) {
    if (!status) return null;
    const chave = status.toUpperCase().replace(/\s+/g, '_');
    const chaveNormalizada = normalizarChaveStatus(status);
    const tipo = TIPOS_STATUS[chave] || TIPOS_STATUS[chaveNormalizada];
    return tipo ? <Badge texto={tipo.label} type={tipo.type} /> : null;
}

export interface MembroGrupo {
    id: number;
    identificador: string;
    nome: string;
    email: string;
    instituicao: string | null;
    status: {
        codigo: string;
        nome: string;
    };
    acoesCount: number;
}

// Columns for acoes DataTable
const ACOES_COLUMNS: TableColumn<Acao>[] = [
    {
        selector: (row) => row.nome,
        sortable: true,
        grow: 1.17
    },
    {
        cell: (row) => {
            return <BadgeStatusAcao status={row.status} />;
        },
        sortable: true,
        wrap: true
    }
];

const ExpandableRowComponent: React.FC<{ id: number }> = ({ id }) => {
    const { caso } = useCasoSelecionado();
    const [isModalEditarAberto, setModalEditar] = useState(false);
    const [acaoSelecionada, setAcaoSelecionada] = useState<Acao | null>(null);
    const queryClient = useQueryClient();

    const abrirModal = (row: Acao) => {
        setAcaoSelecionada(row);
        setModalEditar(true);
    };

    const { data: acoes = [], isLoading } = useQuery({
        queryKey: ['acoes-intervencao-membro', caso.id, id],
        queryFn: () => buscarAcoesMembro(caso.id, id),
        select: (result) =>
            result.map((acao) => ({
                id: acao.id,
                nome: acao.nome,
                status: acao.statusConclusao?.nome || acao.status.nome
            }))
    });

    return (
        <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
            {isLoading ? (
                <div>Carregando ações...</div>
            ) : (
                <DataTable
                    data={acoes}
                    columns={ACOES_COLUMNS}
                    customStyles={dataTableStyle}
                    noDataComponent="Nenhuma ação encontrada"
                    onRowClicked={abrirModal}
                    noHeader
                    noTableHead
                />
            )}
            {acaoSelecionada && (
                <EditarAcaoModal
                    aberto={isModalEditarAberto}
                    handleFecharModal={() => setModalEditar(false)}
                    idCaso={caso.id}
                    idAcao={acaoSelecionada.id}
                    onAcaoAtualizada={() => {
                        queryClient.invalidateQueries({
                            queryKey: ['acoes-intervencao-membro', caso.id, id]
                        });
                        queryClient.invalidateQueries({
                            queryKey: ['casos', 'membros-grupo-trabalho-com-acoes', caso.id]
                        });
                        queryClient.invalidateQueries({
                            queryKey: ['acoes-intervencao', caso.id]
                        });
                    }}
                />
            )}
        </div>
    );
};

export default function AtoresReuniao() {
    const { caso } = useCasoSelecionado();
    const queryClient = useQueryClient();

    const { data: membrosWithActionCount = [], isLoading } = useQuery({
        queryKey: ['casos', 'membros-grupo-trabalho-com-acoes', caso.id],
        queryFn: async () => {
            const membros = await buscarMembrosGrupo(caso.id);
            const membrosComAcoes = await Promise.all(
                membros.map(async (membro) => {
                    try {
                        const acoes = await buscarAcoesMembro(caso.id, membro.id);
                        return {
                            ...membro,
                            acoesCount: acoes.length
                        };
                    } catch (error) {
                        console.error(`Erro ao buscar ações do membro ${membro.id}:`, error);
                        return {
                            ...membro,
                            acoesCount: 0
                        };
                    }
                })
            );
            return membrosComAcoes;
        }
    });

    const enviarConviteMutation = useMutation({
        mutationFn: (data: ConvidarMembroGrupoFormData) => {
            return enviarConviteMembroGrupo(caso.id, {
                motivo: data.motivo,
                convidado: {
                    nome: data.nome,
                    email: data.email,
                    instituicao: data.instituicao
                }
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['casos', 'membros-grupo-trabalho-com-acoes', caso.id]
            });
            setModalConvidarAberto(false);
        }
    });

    const enviarAcaoMutation = useMutation({
        mutationFn: async (data: RegistrarAcaoFormData) => {
            return criarAcao(caso.id, {
                nomeMembro: data.responsavel,
                comentario: data.comentario,
                nome: data.nome,
                prazo: data.prazo
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['casos', 'membros-grupo-trabalho-com-acoes', caso.id]
            });
            await queryClient.invalidateQueries({
                queryKey: ['acoes-intervencao-membro'],
                exact: false
            });
            await queryClient.invalidateQueries({
                queryKey: ['acoes-intervencao', caso.id]
            });
            await Swal.fire({
                title: 'Ação registrada!',
                text: 'Uma nova ação foi registrada com sucesso.',
                icon: 'success',
                timer: 4000,
                confirmButtonText: 'Continuar'
            });
            setModalAcao(false);
        },
        onError: (error: unknown) => {
            const errorMessage =
                (error as { response?: { data?: { message?: string } } })?.response?.data
                    ?.message ||
                (error as Error).message ||
                'Erro ao registrar ação';
            Swal.fire({
                title: 'Erro!',
                text: errorMessage,
                icon: 'error'
            });
        }
    });

    const [isModalConvidarAberto, setModalConvidarAberto] = useState(false);
    const [isModalAcaoAberto, setModalAcao] = useState(false);

    return (
        <BoxContainer
            titulo="Atores / Situação das Ações"
            acoesContainer={() => (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button action={() => setModalConvidarAberto(true)}>
                        <FaUserPlus />
                        Convidar
                    </Button>
                    <Button action={() => setModalAcao(true)}>
                        <FaUserPlus />
                        Registrar Ação
                    </Button>
                </div>
            )}>
            <DataTable
                data={membrosWithActionCount ?? []}
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
            <RegistrarAcaoModal
                aberto={isModalAcaoAberto}
                handleFecharModal={() => setModalAcao(false)}
                onSubmit={async (data) => {
                    await enviarAcaoMutation.mutateAsync(data);
                }}
            />
        </BoxContainer>
    );
}
