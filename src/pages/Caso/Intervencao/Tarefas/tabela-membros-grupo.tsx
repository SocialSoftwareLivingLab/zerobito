import { TableColumn } from 'react-data-table-component';
import { MembroGrupoTrabalho } from '../../../../common/models/caso/grupo-trabalho/membro';
import { BadgeStatusAcao, MembroGrupo } from '.';
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
        cell: (sel) => <BadgeStatusAcao status={sel.status.codigo} />,
        sortable: true
    },
    {
        name: 'Ações',
        selector: (sel) => sel.acoesCount?.toString() || '0',
        sortable: true
    }
];
