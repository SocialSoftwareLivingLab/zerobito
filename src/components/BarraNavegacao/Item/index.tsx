import React from 'react';
import { ItemNavegacaoContainer } from './styles';

interface ItemAbaNavegacaoProps {
    titulo: string;
    icone: React.ReactNode;
    url: string;
    action?: () => void;
}

export default function ItemAbaNavegacao({ titulo, icone, url, action }: ItemAbaNavegacaoProps) {
    return (
        <ItemNavegacaoContainer to={url} onClick={action}>
            <div>
                {icone}
                {titulo}
            </div>
        </ItemNavegacaoContainer>
    );
}
