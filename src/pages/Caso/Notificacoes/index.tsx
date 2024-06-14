import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { consultarNotificacoes } from '../../../common/api/casos/notificacoes/consultar-notificacoes';
import NotificacaoTable from '../../../components/Tabelas/Casos/Notificacao';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { Button } from '../../../components/ui/Button';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { NotificacoesContainer } from './styles';
import ReactModal from 'react-modal';
import Modal from '../../../components/ui/Modal';

export default function Notificacoes() {
    const { caso } = useCasoSelecionado();

    const { data, isLoading } = useQuery({
        queryKey: ['casos', 'notificacoes', caso.id],
        queryFn: () => consultarNotificacoes(caso.id)
    });

    const [modalAberto, setModalAberto] = useState(false);

    const NovaNotificacaoButton = () => (
        <Button action={() => setModalAberto(true)}>
            <FaPlusSquare /> Adicionar Notificação
        </Button>
    );

    return (
        <NotificacoesContainer>
            <BoxContainer titulo="Documentos" acoesContainer={NovaNotificacaoButton}>
                {isLoading && <p>Carregando...</p>}
                {!isLoading && <NotificacaoTable data={data} />}
            </BoxContainer>
            <Modal
                titulo="Cadastrar nova notificação"
                aberto={modalAberto}
                handleFecharModal={() => setModalAberto(false)}>
                <h2>Testando react modal</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore
                    vel hic impedit tenetur illum quaerat, iste, consequatur nam unde libero
                    doloribus quasi voluptas obcaecati! Impedit consequatur cupiditate maiores et!
                </p>
            </Modal>
        </NotificacoesContainer>
    );
}
