import React from 'react';
import { FaBell, FaFileAlt } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { CasoInfoContainer } from './styles';

export function CasoInfo() {
    const dateFormat = Intl.DateTimeFormat('pt-br');

    const caso = {
        id: 1,
        dataCriacao: new Date()
    };
    return (
        <CasoInfoContainer>
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
        </CasoInfoContainer>
    );
}
