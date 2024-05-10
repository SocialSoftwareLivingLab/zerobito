import React from 'react';
import { DossieNavContainerStyle } from './styles';
import { FaBell, FaFileAlt } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { Caso } from '../../../common/models/caso/caso';

interface DossieNavContainerProps {
    caso: Caso;
}

export function DossieNavContainer({ caso }: DossieNavContainerProps) {
    const dateFormat = Intl.DateTimeFormat('pt-br');
    return (
        <DossieNavContainerStyle>
            <header>
                <label>
                    <FaFileAlt /> Código do caso:
                </label>
                <span>{String(caso.id).padStart(5, '0')}</span>
                <label>
                    <MdOutlineDateRange /> Data de Denúncia:
                </label>
                <span>{dateFormat.format(new Date(caso.dataCriacao))}</span>
                <label>
                    <FaBell /> Status de notificação obrigatório:
                </label>
                <span>Aguardando Análise</span>
            </header>
        </DossieNavContainerStyle>
    );
}
