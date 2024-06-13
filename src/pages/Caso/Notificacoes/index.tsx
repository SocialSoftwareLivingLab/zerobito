import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { consultarNotificacoes } from '../../../common/api/casos/notificacoes/consultar-notificacoes';
import NotificacaoTable from '../../../components/Tabelas/Casos/Notificacao';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { Button } from '../../../components/ui/Button';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { NotificacoesContainer } from './styles';

function NovoDocumentoAcao() {
    return (
        <Button>
            <FaPlusSquare /> Adicionar Notificação
        </Button>
    );
}

export default function Notificacoes() {
    const { caso } = useCasoSelecionado();

    const { data, isLoading } = useQuery({
        queryKey: ['casos', 'notificacoes', caso.id],
        queryFn: () => consultarNotificacoes(caso.id)
    });

    return (
        <NotificacoesContainer>
            <BoxContainer titulo="Documentos" acoesContainer={NovoDocumentoAcao}>
                {isLoading && <p>Carregando...</p>}
                {!isLoading && <NotificacaoTable data={data} />}
            </BoxContainer>
        </NotificacoesContainer>
    );
}
