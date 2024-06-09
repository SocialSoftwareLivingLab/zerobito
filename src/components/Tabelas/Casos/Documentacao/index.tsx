import React from 'react';
import DataTable from 'react-data-table-component';
import { DocumentoNotificacao } from '../../../../common/models/caso/documento-notificacao';
import { dataTableStyle } from '../../custom';
import { ColunasTabelaListarCasos } from './colunas';

export interface DocumentacaoTableProps {
    data: DocumentoNotificacao[];
}

export default function DocumentacaoTable({ data }: DocumentacaoTableProps) {
    return (
        <DataTable
            data={data}
            columns={ColunasTabelaListarCasos}
            customStyles={dataTableStyle}
            noDataComponent="Nenhum documento encontrado"
        />
    );
}
