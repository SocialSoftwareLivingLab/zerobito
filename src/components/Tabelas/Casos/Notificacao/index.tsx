import React from 'react';
import DataTable from 'react-data-table-component';
import { NotificacaoCaso } from '../../../../common/models/caso/notificacao';
import { dataTableStyle } from '../../custom';
import { ColunasTabelaListarNotificacoes } from './colunas';

export interface NotificacaoTableProps {
    data: NotificacaoCaso[];
}

export default function NotificacaoTable({ data }: NotificacaoTableProps) {
    return (
        <DataTable
            data={data}
            columns={ColunasTabelaListarNotificacoes}
            customStyles={dataTableStyle}
            noDataComponent="Nenhuma notificação encontrada"
        />
    );
}
