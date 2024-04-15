import React from 'react';
import { DossieItemNavegacaoContainer } from './styles';

interface DossieItemAbaNavegacaoProps {
    titulo: string;
    icone: React.ReactNode;
    url: string;
    action?: () => void;
}

export default function DossieItemAbaNavegacao({
    titulo,
    icone,
    url,
    action
}: DossieItemAbaNavegacaoProps) {
    return (
        <DossieItemNavegacaoContainer to={url} onClick={action}>
            <div>
                {icone}
                {titulo}
            </div>
        </DossieItemNavegacaoContainer>
    );
}
