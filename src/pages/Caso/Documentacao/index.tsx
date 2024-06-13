import React from 'react';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { DocumentacaoContainer } from './styles';
import { Button } from '../../../components/ui/Button';
import { FaPlusSquare } from 'react-icons/fa';
import NotificacaoTable from '../../../components/Tabelas/Casos/Notificacao';
import { DocumentoNotificacao } from '../../../common/models/caso/notificacao';
import { useQuery } from '@tanstack/react-query';
import { consultarNotificacoes } from '../../../common/api/casos/notificacoes/consultar-notificacoes';

function NovoDocumentoAcao() {
    return (
        <Button>
            <FaPlusSquare /> Adicionar Notificação
        </Button>
    );
}

export default function Documentacao() {
    const { caso } = useCasoSelecionado();

    const { data, isLoading } = useQuery({
        queryKey: ['casos', 'notificacoes', caso.id],
        queryFn: () => consultarNotificacoes(caso.id)
    });

    return (
        <DocumentacaoContainer>
            <BoxContainer titulo="Documentos" acoesContainer={NovoDocumentoAcao}>
                {isLoading && <p>Carregando...</p>}
                {!isLoading && <NotificacaoTable data={data} />}
            </BoxContainer>
        </DocumentacaoContainer>
    );
}
