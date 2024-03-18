import React from "react";
import { BoxContainerStyle } from "./styles";

interface BoxContainerProps {
    titulo: string,
    acoesContainer?: React.ComponentType,
    children: React.ReactNode | React.ReactNode[]
}

export function BoxContainer({ titulo, acoesContainer: AcoesContainer, children }: BoxContainerProps) {
    return (
        <BoxContainerStyle>
            <header>
                <h2>{titulo}</h2>
                {AcoesContainer && <AcoesContainer />}
            </header>
            {children}
        </BoxContainerStyle>
    )
}