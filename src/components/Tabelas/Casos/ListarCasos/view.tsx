import React from 'react';
import { Caso } from '../../../../common/models/caso/caso';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Paginacao, dataTableStyle } from '../../custom';

export interface ListarCasoTableViewProps {
    casos: Caso[];
    colunas: TableColumn<Caso>[];
}

export function ListarCasosTableView({ casos, colunas }: ListarCasoTableViewProps) {
    return (
        <DataTable
            data={casos}
            columns={colunas}
            customStyles={dataTableStyle}
            noDataComponent="Nenhum caso encontrado"
            pagination
            paginationComponent={Paginacao}
        />
    );
}
