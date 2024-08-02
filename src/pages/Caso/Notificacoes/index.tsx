import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { EditarNotificacao } from '../../../common/api/casos/notificacoes/cadastrar-notificacao';
import { consultarNotificacoes } from '../../../common/api/casos/notificacoes/consultar-notificacoes';
import { NotificacaoCaso } from '../../../common/models/caso/notificacao';
import CriarNotificacaoModal, {
    CriarNotificacaoForm
} from '../../../components/Caso/Notificacao/CriarNotificacaoModal';
import NotificacaoTable from '../../../components/Tabelas/Casos/Notificacao';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { NotificacoesContainer } from './styles';

export default function Notificacoes() {
    const { caso } = useCasoSelecionado();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['casos', 'notificacoes', caso.id],
        queryFn: () => consultarNotificacoes(caso.id)
    });

    const [modalAberto, setModalAberto] = useState(false);
    const [notificacaoSelecionada, setNotificacaoSelecionada] = useState<NotificacaoCaso | null>(
        null
    );

    const handleFecharModal = useCallback(() => setModalAberto(false), [setModalAberto]);
    const handleAbrirModal = useCallback(
        (notificacao: NotificacaoCaso) => {
            setNotificacaoSelecionada(notificacao);
            setModalAberto(true);
        },
        [setModalAberto, setNotificacaoSelecionada]
    );

    const onSubmitCadastroNotificacao = useCallback(
        async (data: CriarNotificacaoForm) => {
            await EditarNotificacao(caso.id, {
                dataEmissao: data.statusNotificacao !== 'Não se aplica' ? data.dataEmissao : null,
                identificador: data.statusNotificacao !== 'Não se aplica' ? data.identificador : '',
                observacao: data.statusNotificacao !== 'Não se aplica' ? data.observacao : '',
                tipo: data.tipoDocumento,
                isEmitida: data.statusNotificacao !== 'Não se aplica',
                statusNotificacao:
                    data.statusNotificacao === 'Não se aplica' ? 'Não se aplica' : 'Emitida'
            });
            await refetch();
        },
        [caso.id, refetch]
    );

    return (
        <NotificacoesContainer>
            <BoxContainer titulo="Documentos">
                {isLoading && <p>Carregando...</p>}
                {!isLoading && <NotificacaoTable data={data ?? []} onRowClick={handleAbrirModal} />}
            </BoxContainer>
            <CriarNotificacaoModal
                aberto={modalAberto}
                handleFecharModal={handleFecharModal}
                onSubmit={onSubmitCadastroNotificacao}
                notificacao={notificacaoSelecionada}
            />
        </NotificacoesContainer>
    );
}
