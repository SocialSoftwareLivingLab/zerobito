import { TableColumn } from 'react-data-table-component';
import { MembroGrupoTrabalho } from '../../../../common/models/caso/grupo-trabalho/membro';
import BadgeStatus, { BadgeStatusTarefa } from '.';
import React from 'react';

export const TIPOS_STATUS = {
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

export const COLUNAS_MEMBROS_GRUPO_TRABALHO: TableColumn<MembroGrupoTrabalho>[] = [
    {
        name: 'Nome',
        selector: (sel) => sel.nome,
        sortable: true
    },
    {
        name: 'Instituição',
        selector: (sel) => sel.instituicao || 'Não informada',
        sortable: true
    },
    {
        name: 'Status',
        cell: (sel) => <BadgeStatusTarefa status={sel.status.codigo} />,
        sortable: true
    },
    {
        name: 'Atribuições',
        selector: (sel) => 'Não informada',
        grow: 2,
        sortable: true
    }
];
