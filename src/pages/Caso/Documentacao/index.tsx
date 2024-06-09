import React from 'react';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { DocumentacaoContainer } from './styles';
import { Button } from '../../../components/ui/Button';
import { FaPlusSquare } from 'react-icons/fa';
import DocumentacaoTable from '../../../components/Tabelas/Casos/Documentacao';
import { DocumentoNotificacao } from '../../../common/models/caso/documento-notificacao';

function NovoDocumentoAcao() {
    return (
        <Button>
            <FaPlusSquare /> Adicionar Notificação
        </Button>
    );
}

export default function Documentacao() {
    const { caso } = useCasoSelecionado();
    const documentosFake: DocumentoNotificacao[] = [
        {
            id: 1,
            dataEmissao: new Date(),
            dataCriacao: new Date(),
            tipo: {
                id: 1,
                nome: 'Documento 1'
            },
            identificacao: '12356.12664',
            observacao: 'Observação 1'
        },
        {
            id: 2,
            dataEmissao: new Date(),
            dataCriacao: new Date(),
            tipo: {
                id: 2,
                nome: 'Documento 2'
            },
            identificacao: '12356.12664',
            observacao: 'Observação 2'
        }
    ];

    return (
        <DocumentacaoContainer>
            <BoxContainer titulo="Documentos" acoesContainer={NovoDocumentoAcao}>
                <DocumentacaoTable data={documentosFake} />
            </BoxContainer>
        </DocumentacaoContainer>
    );
}
