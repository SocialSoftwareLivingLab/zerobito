import React from 'react';
import { PalavraChaveContainer } from './styles';
import { MdCancel } from 'react-icons/md';

export interface PalavraChaveProps {
    label: string;
}

export default function PalavraChave({ label }: PalavraChaveProps) {
    return (
        <PalavraChaveContainer>
            <span>{label}</span> <MdCancel />
        </PalavraChaveContainer>
    );
}
