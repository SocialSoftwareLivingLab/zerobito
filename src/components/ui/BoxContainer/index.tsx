import React from 'react';
import { BoxContainerStyle } from './styles';

interface BoxContainerProps {
    titulo: string;
    acoesContainer?: () => React.ReactNode;
    children: React.ReactNode | React.ReactNode[];
}

export function BoxContainer({ titulo, acoesContainer, children }: BoxContainerProps) {
    return (
        <BoxContainerStyle>
            <header>
                <h2>{titulo}</h2>
                {acoesContainer && acoesContainer()}
            </header>
            {children}
        </BoxContainerStyle>
    );
}
