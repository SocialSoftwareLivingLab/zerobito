import { TableColumn } from 'react-data-table-component';
import { NotificacaoCaso } from '../../../../common/models/caso/notificacao';

const dateFormat = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });

export const ColunasTabelaListarNotificacoes: TableColumn<NotificacaoCaso>[] = [
    {
        name: 'Data de Emissão',
        selector: (data) => String(data.dataEmissao),
        format: (row) => dateFormat.format(new Date(row.dataEmissao)),
        sortable: true
    },
    {
        name: 'Data de Inserção',
        selector: (data) => String(data.dataCriacao),
        format: (row) => dateFormat.format(new Date(row.dataCriacao)),
        sortable: true
    },
    {
        name: 'Documento',
        selector: (data) => data.tipo.nome,
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
