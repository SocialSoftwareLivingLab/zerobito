import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Caso } from '../../../../common/models/caso/caso';
import { dataTableStyle } from '../../custom';

export interface SelecionarCasoTableViewProps {
    casos: Caso[];
    colunas: TableColumn<Caso>[];
    handleChange: ({ selectedRows }: { selectedRows: Caso[] }) => void;
}

export function SelecionarCasoTableView({
    casos,
    colunas,
    handleChange
}: SelecionarCasoTableViewProps) {
    return (
        <DataTable
            data={casos}
            columns={colunas}
            customStyles={dataTableStyle}
            selectableRows
            selectableRowsHighlight
            selectableRowsNoSelectAll
            selectableRowsSingle
            noDataComponent="Nenhum caso encontrado"
            onSelectedRowsChange={handleChange}
        />
    );
}
