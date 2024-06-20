import { TableColumn } from 'react-data-table-component';
import { NotificacaoCaso } from '../../../../common/models/caso/notificacao';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import React from 'react';
import {
    EditNotificacaoRequest,
    editNotificacao
} from '../../../../common/api/casos/notificacoes/editar-notificacao';

const dateFormat = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });

interface EmissaoProps {
    notificacaoAtual: {
        id: string;
        identificador: string;
        isEmitida: boolean;
    };
}

function BotaoEmissao({ notificacaoAtual }: EmissaoProps) {
    const editNotificacaoHandler = async () => {
        const payload: EditNotificacaoRequest = { isEmitida: !notificacaoAtual.isEmitida };
        try {
            const response = await editNotificacao(
                payload,
                Number(notificacaoAtual.id),
                notificacaoAtual.identificador
            );
            console.log('Notificação atualizada:', response);
        } catch (error) {
            console.error('Erro ao atualizar notificação:', error);
        }
    };

    return (
        <>
            {notificacaoAtual.isEmitida ? (
                <FaCheckCircle onClick={editNotificacaoHandler} />
            ) : (
                <FaRegCircle onClick={editNotificacaoHandler} />
            )}
        </>
    );
}
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
    },
    {
        name: 'Emissão',
        sortable: false,
        cell: (row) => <BotaoEmissao notificacaoAtual={row} />
    }
];
