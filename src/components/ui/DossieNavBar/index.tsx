import React from 'react';
import { DossieNavContainerStyle } from './styles';
import { FaBell, FaFileAlt } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';

interface DossieNavContainerProps {
    id: string;
    data: string;
    status: string;
}

export function DossieNavContainer({ id, data, status }: DossieNavContainerProps) {
    return (
        <DossieNavContainerStyle>
            <header>
                <label>
                    <FaFileAlt /> Código de acesso:
                </label>
                <span>{id}</span>
                <label>
                    <MdOutlineDateRange /> Data de Denúncia:
                </label>
                <span>{data}</span>
                <label>
                    <FaBell /> Status de notificação obrigatório:
                </label>
                <span>{status}</span>
            </header>
        </DossieNavContainerStyle>
    );
}
