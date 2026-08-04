import React from 'react';
import { CasoInfoItemContainer } from './styles';

export interface CasoInfoItemProps {
    icone: React.ReactNode;
    label: string;
    valor: string;
}

export default function CasoInfoItem({ icone, label, valor }: CasoInfoItemProps) {
    return (
        <CasoInfoItemContainer>
            {icone}
            <strong>{label}:</strong>
            <span>{valor}</span>
        </CasoInfoItemContainer>
    );
}
