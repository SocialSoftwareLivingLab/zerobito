import React from 'react';

import { TableColumn } from 'react-data-table-component';
import { OcorrenciaModel } from '../../../common/models/ocorrencias/model';
import { AcoesLinha, BadgeGravidade } from '.';

export const COLUNAS_TABELA_OCORRENCIAS: TableColumn<OcorrenciaModel>[] = [
    {
        name: 'Denúncia',
        selector: (sel) => sel.descricao,
        sortable: true,
        grow: 2,
        allowOverflow: true,
        wrap: true
    },
    {
        name: 'Data',
        selector: (sel) => String(sel.data),
        sortable: true,
        allowOverflow: true,
        format: (row) =>
            Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(row.data)),
        wrap: true
    },
    {
        name: 'Tipo',
        selector: (sel) => LABELS_TIPO_OCORRENCIA[sel.vitima.condicao] ?? '',
        sortable: true,
        allowOverflow: true,
        wrap: true
    },
    {
        name: 'Gravidade',
        cell: (row) => <BadgeGravidade gravidade={row.vitima.gravidade} />,
        sortable: true,
        allowOverflow: true,
        wrap: true
    },
    {
        name: 'Status',
        selector: (sel) => sel.status.descricao,
        sortable: true,
        allowOverflow: true,
        wrap: true
    },
    {
        name: 'Ações',
        sortable: true,
        grow: 2,
        cell: (row) => <AcoesLinha row={row} />
    }
];

export const TIPOS_GRAVIDADE = {
    EMERGENCIAL: {
        label: 'Emergencial',
        type: 'danger'
    },
    MUITO_URGENTE: {
        label: 'Muito Urgente',
        type: 'warning'
    },
    URGENTE: {
        label: 'Muito Urgente',
        type: 'info'
    },
    POUCO_URGENTE: {
        label: 'Pouco Urgente',
        type: 'dark'
    }
};

export const LABELS_TIPO_OCORRENCIA = {
    OBITO: 'Óbito',
    INCIDENTE_ALTO_POTENCIAL: 'Alto potencial'
};
