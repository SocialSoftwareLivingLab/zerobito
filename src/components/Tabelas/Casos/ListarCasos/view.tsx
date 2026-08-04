import React from 'react';
import { Caso } from '../../../../common/models/caso/caso';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Paginacao, dataTableStyle } from '../../custom';

export interface ListarCasoTableViewProps {
    readonly casos: Caso[];
    readonly colunas: TableColumn<Caso>[];
    readonly onRowClick: (row: Caso) => void;
}

export function ListarCasosTableView({
    casos,
    colunas,
    onRowClick
}: Readonly<ListarCasoTableViewProps>) {
    return (
        <DataTable
            data={casos}
            columns={colunas}
            customStyles={dataTableStyle}
            noDataComponent="Nenhum caso encontrado"
            pagination
            paginationComponent={Paginacao}
            onRowClicked={onRowClick}
        />
    );
}
