import React from 'react';
import { BiCheckDouble, BiSolidHelpCircle } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { IoMdDownload, IoMdMap } from 'react-icons/io';
import { RiShieldCheckFill } from 'react-icons/ri';
import { TfiMenuAlt } from 'react-icons/tfi';
import { CasoNavegacaoContainer } from './styles';
import CasoNavegacaoItem from './CasoNavegacaoItem';

export interface OcorrenciaStep {
    step:
        | 'Dossiê'
        | 'Notificações'
        | 'Preparação'
        | 'Planejamento'
        | 'Investigação'
        | 'Intervenção'
        | 'Finalização'
        | 'Avaliação Externa';
}

export function CasoNavegacao() {
    return (
        <CasoNavegacaoContainer>
            <header>
                <CasoNavegacaoItem
                    ativo={false}
                    titulo="Dossiê"
                    icone={<TfiMenuAlt />}
                    url="#/#/#"
                />
                <CasoNavegacaoItem ativo={false} titulo="Notificações" icone={<FaBell />} url="#" />
                <CasoNavegacaoItem
                    ativo={false}
                    titulo="Preparação"
                    icone={<BsFillGearFill />}
                    url="#"
                />
                <CasoNavegacaoItem
                    ativo={false}
                    titulo="Planejamento"
                    icone={<BiSolidHelpCircle />}
                    url="#/#/#"
                />
                <CasoNavegacaoItem
                    ativo={false}
                    titulo="Investigação"
                    icone={<IoMdMap />}
                    url="#"
                />
                <CasoNavegacaoItem
                    ativo={false}
                    titulo="Intervenção"
                    icone={<IoMdDownload />}
                    url="#"
                />
                <CasoNavegacaoItem
                    ativo={false}
                    titulo="Finalização"
                    icone={<BiCheckDouble />}
                    url="#"
                />
                <CasoNavegacaoItem
                    ativo={false}
                    titulo="Avaliação Externa"
                    icone={<RiShieldCheckFill />}
                    url="#"
                />
            </header>
        </CasoNavegacaoContainer>
    );
}
