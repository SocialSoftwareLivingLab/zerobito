import React from 'react';
import { ItemNavegacaoContainer } from './styles';

interface ItemAbaNavegacaoProps {
    titulo: string;
    icone: React.ReactNode;
    url: string;
}

export default function ItemAbaNavegacao({ titulo, icone, url }: ItemAbaNavegacaoProps) {
    return (
        <ItemNavegacaoContainer to={url}>
            <div>
                {icone}
                {titulo}
            </div>
        </ItemNavegacaoContainer>
    );
}
