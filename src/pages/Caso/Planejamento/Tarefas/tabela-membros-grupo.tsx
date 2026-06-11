import { TableColumn } from 'react-data-table-component';
import { BadgeStatusTarefa, MembroGrupo } from '.';
import React from 'react';

export const COLUNAS_MEMBROS_GRUPO_TRABALHO: TableColumn<MembroGrupo>[] = [
    {
        name: 'Nome',
        selector: (sel) => sel.nome,
        sortable: true
    },
    {
        name: 'Instituições',
        selector: (sel) => sel.instituicao || 'Não informada',
        sortable: true
    },
    {
        name: 'Status',
        cell: (sel) => <BadgeStatusTarefa status={sel.status.codigo} />,
        sortable: true
    },
    {
        name: 'Tarefas',
        selector: (sel) => sel.tarefasCount?.toString() || '0', // Use tarefasCount or fallback to '0'
        sortable: true
    }
];
