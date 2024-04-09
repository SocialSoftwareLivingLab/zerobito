import React from 'react';

import { TableColumn } from 'react-data-table-component';
import { OcorrenciaModel } from '../../../common/models/ocorrencias/model';
import { AcoesLinha, BadgeStatus } from '.';

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
    // {
    //     name: 'Status',
    //     selector: (sel) => sel.status.descricao,
    //     sortable: true,
    //     allowOverflow: true,
    //     wrap: true
    // },
    {
        name: 'Status',
        cell: (row) => <BadgeStatus status={row.status.sigla} />,
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

export const TIPOS_STATUS = {
    AGUARDANDO_ANALISE: {
        label: 'Aguardando Análise',
        type: 'warning'
    },
    ACEITA: {
        label: 'Aceita',
        type: 'success'
    },
    MONITORANDO: {
        label: 'Monitorando',
        type: 'info'
    }
};

export const LABELS_TIPO_OCORRENCIA = {
    OBITO: 'Óbito',
    INCIDENTE_ALTO_POTENCIAL: 'Alto potencial'
};
