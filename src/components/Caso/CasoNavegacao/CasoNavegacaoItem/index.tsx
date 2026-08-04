import React from 'react';
import { CasoNavegacaoItemContainer } from './styles';

interface CasoNavegacaoItemProps {
    titulo: string;
    ativo: boolean;
    icone: React.ReactNode;
    url: string;
    action?: () => void;
}

export default function CasoNavegacaoItem({
    titulo,
    icone,
    url,
    ativo,
    action
}: CasoNavegacaoItemProps) {
    return (
        <CasoNavegacaoItemContainer to={url} onClick={action} ativo={ativo}>
            <div>
                {icone}
                {titulo}
            </div>
        </CasoNavegacaoItemContainer>
    );
}
