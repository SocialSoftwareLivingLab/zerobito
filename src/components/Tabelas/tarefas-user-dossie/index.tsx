import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { buscarTarefasMembro } from '../../../common/api/casos/grupo-trabalho/tarefas-membro';
import { BoxContainer } from '../../ui/BoxContainer';
import Badge from '../../ui/Badge';
import { dataTableStyle } from '../custom';
import { useUsuarioAutenticado } from '../../../contexts/usuario-autenticado';
import { buscarMembrosGrupo } from '../../../common/api/casos/grupo-trabalho/consultar-membros-grupo';

interface Tarefa {
    nome: string;
    status: string;
}

const TIPOS_STATUS = {
    CONCLUIDO: {
        label: 'Pendente',
        type: 'success'
    },
    ATRASADO: {
        label: 'Atrasado',
        type: 'danger'
    },
    EM_ANDAMENTO: {
        label: 'Em andamento',
        type: 'warning'
    },
    PENDENTE: {
        label: 'Pendente',
        type: 'warning'
    },
    ACEITO: {
        label: 'Aceito',
        type: 'success'
    },
    MONITORANDO: {
        label: 'Atrasado',
        type: 'danger'
    }
};

// Columns for tarefas DataTable
const TAREFAS_COLUMNS: TableColumn<Tarefa>[] = [
    {
        name: 'Tarefa',
        selector: (row) => row.nome,
        sortable: true,
        grow: 1.17
    },
    {
        name: 'Status',
        cell: (row) => {
            const statusKey = row.status.toUpperCase().replace(/\s+/g, '_');
            return <BadgeStatusTarefa status={statusKey} />;
        },
        sortable: true,
        wrap: true
    }
];

export function BadgeStatusTarefa({ status }: { status: string | null }) {
    const tipo = TIPOS_STATUS[status];
    return status && <Badge texto={tipo.label} type={tipo.type} />;
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

export default function SuasTarefas() {
    const { caso } = useCasoSelecionado();
    const { data } = useUsuarioAutenticado();
    const queryClient = useQueryClient();

    const user = data;

    const { data: membro } = useQuery({
        queryKey: ['casos', 'membros-grupo-trabalho-com-tarefas', caso.id],
        queryFn: async () => await buscarMembrosGrupo(caso.id),
        select: (result) => result.find((m) => m.nome === user.nome)
    });

    const { data: tarefas = [], isLoading } = useQuery({
        queryKey: ['tarefas', caso.id, membro?.id],
        queryFn: () => (membro?.id ? buscarTarefasMembro(caso.id, membro.id) : Promise.resolve([])),
        select: (result) =>
            result.map((tarefa) => ({
                ...tarefa,
                status: tarefa.status.nome
            }))
    });

    return (
        <BoxContainer titulo="Suas tarefas do caso">
            <DataTable
                data={tarefas}
                columns={TAREFAS_COLUMNS}
                progressPending={isLoading}
                progressComponent="Carregando..."
                noDataComponent="Nenhuma tarefa encontrada"
                customStyles={dataTableStyle}
            />
        </BoxContainer>
    );
}
