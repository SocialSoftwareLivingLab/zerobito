import React from 'react';
import { PalavraChaveContainer } from './styles';
import { MdCancel } from 'react-icons/md';

export interface PalavraChaveProps {
    label: string;
    removeHandle: () => void;
}

export default function PalavraChave({ label, removeHandle }: PalavraChaveProps) {
    return (
        <PalavraChaveContainer>
            <span>{label}</span> <MdCancel onClick={removeHandle} />
        </PalavraChaveContainer>
    );
}
