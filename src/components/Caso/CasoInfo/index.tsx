import React from 'react';
import { FaBell, FaFileAlt } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { CasoInfoContainer } from './styles';
import CasoInfoItem from './CasoInfoItem';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';

export function CasoInfo() {
    const dateFormat = Intl.DateTimeFormat('pt-br');
    const { caso } = useCasoSelecionado();

    return (
        <CasoInfoContainer>
            <CasoInfoItem
                icone={<FaFileAlt />}
                label="Código do caso"
                valor={String(caso.id).padStart(5, '0')}
            />
            <CasoInfoItem
                icone={<MdOutlineDateRange />}
                label="Data de Denúncia"
                valor={dateFormat.format(new Date(caso.dataCriacao))}
            />
            <CasoInfoItem
                icone={<FaBell />}
                label="Status de notificação obrigatório"
                valor="Aguardando Análise"
            />
        </CasoInfoContainer>
    );
}
