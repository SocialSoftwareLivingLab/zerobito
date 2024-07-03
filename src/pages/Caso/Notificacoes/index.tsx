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
import { EditarNotificacao } from '../../../common/api/casos/notificacoes/cadastrar-notificacao';

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

    const NovaNotificacaoButton = () => (
        <Button action={handleAbrirModal}>
            <FaPlusSquare /> Atualizar Notificação
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
