import React from 'react';
import { ItemNavegacaoContainer } from './styles';

interface ItemAbaNavegacaoProps {
    readonly titulo: string;
    readonly icone: React.ReactNode;
    readonly url: string;
    readonly action?: () => void;
}

export default function ItemAbaNavegacao({
    titulo,
    icone,
    url,
    action
}: Readonly<ItemAbaNavegacaoProps>) {
    return (
        <ItemNavegacaoContainer to={url} onClick={action}>
            <div>
                {icone}
                {titulo}
            </div>
        </ItemNavegacaoContainer>
    );
}
