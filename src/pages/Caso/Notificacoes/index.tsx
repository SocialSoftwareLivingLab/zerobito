import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { consultarNotificacoes } from '../../../common/api/casos/notificacoes/consultar-notificacoes';
import CriarNotificacaoModal, {
    CriarNotificacaoForm
} from '../../../components/Caso/Notificacao/CriarNotificacaoModal';
import NotificacaoTable from '../../../components/Tabelas/Casos/Notificacao';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { Button } from '../../../components/ui/Button';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { NotificacoesContainer } from './styles';
import { cadastrarNotificacao } from '../../../common/api/casos/notificacoes/cadastrar-notificacao';

export default function Notificacoes() {
    const { caso } = useCasoSelecionado();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['casos', 'notificacoes', caso.id],
        queryFn: () => consultarNotificacoes(caso.id)
    });

    const [modalAberto, setModalAberto] = useState(false);

    const handleFecharModal = useCallback(() => setModalAberto(false), [setModalAberto]);
    const handleAbrirModal = useCallback(() => setModalAberto(true), [setModalAberto]);

    const onSubmitCadastroNotificacao = useCallback(
        async (data: CriarNotificacaoForm) => {
            await cadastrarNotificacao(caso.id, {
                dataEmissao: data.dataEmissao,
                identificador: data.identificador,
                observacao: data.observacao,
                tipo: data.tipoDocumento,
                isEmitida: false
            });
            await refetch();
        },
        [caso.id, refetch]
    );

    const NovaNotificacaoButton = () => (
        <Button action={handleAbrirModal}>
            <FaPlusSquare /> Adicionar Notificação
        </Button>
    );

    return (
        <NotificacoesContainer>
            <BoxContainer titulo="Documentos" acoesContainer={NovaNotificacaoButton}>
                {isLoading && <p>Carregando...</p>}
                {!isLoading && <NotificacaoTable data={data} />}
            </BoxContainer>
            <CriarNotificacaoModal
                aberto={modalAberto}
                handleFecharModal={handleFecharModal}
                onSubmit={onSubmitCadastroNotificacao}
            />
        </NotificacoesContainer>
    );
}
