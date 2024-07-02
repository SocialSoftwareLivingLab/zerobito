import { TableColumn } from 'react-data-table-component';
import { NotificacaoCaso } from '../../../../common/models/caso/notificacao';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const dateFormat = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });

export const ColunasTabelaListarNotificacoes: TableColumn<NotificacaoCaso>[] = [
    {
        name: 'Documento',
        selector: (data) => data.tipo.nome,
        sortable: true
    },
    {
        name: 'Emissão',
        selector: (data) => data.statusNotificacao,
        sortable: true
    },
    {
        name: 'Data de Emissão',
        selector: (data) => String(data.dataEmissao),
        format: (row) => dateFormat.format(new Date(row.dataEmissao)),
        sortable: true
    },
    {
        name: 'Identificador',
        selector: (data) => data.identificador,
        sortable: true
    },
    {
        name: 'Observação',
        selector: (data) => data.observacao,
        sortable: true,
        grow: 4
    }
];
