import DataTable from 'react-data-table-component';
import { NotificacaoCaso } from '../../../../common/models/caso/notificacao';
import { dataTableStyle } from '../../custom';
import { ColunasTabelaListarNotificacoes } from './colunas';

export interface NotificacaoTableProps {
    readonly data: NotificacaoCaso[];
    readonly onRowClick: (row: NotificacaoCaso) => void;
}

export default function NotificacaoTable({ data, onRowClick }: Readonly<NotificacaoTableProps>) {
    return (
        <DataTable
            data={data}
            columns={ColunasTabelaListarNotificacoes}
            customStyles={dataTableStyle}
            noDataComponent="Nenhuma notificação encontrada"
            onRowClicked={onRowClick}
        />
    );
}
