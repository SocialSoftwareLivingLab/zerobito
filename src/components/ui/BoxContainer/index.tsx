import React from 'react';
import { BoxContainerStyle } from './styles';

interface BoxContainerProps {
    readonly titulo: string;
    readonly acoesContainer?: () => React.ReactNode;
    readonly children: React.ReactNode | React.ReactNode[];
}

export function BoxContainer({ titulo, acoesContainer, children }: Readonly<BoxContainerProps>) {
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
