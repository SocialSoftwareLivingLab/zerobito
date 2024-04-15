import React from 'react';
import { DossieBarContainerStyle } from './styles';
import { Button } from '../Button';
import DossieItemAbaNavegacao from './Item';
import { FiLogOut } from 'react-icons/fi';
import { BiCheckDouble, BiSolidHelpCircle } from 'react-icons/bi';
import { FaBell, FaMicrophone, FaUniversity } from 'react-icons/fa';
import { BsBookmarkFill, BsFillGearFill } from 'react-icons/bs';
import { TfiMenuAlt } from 'react-icons/tfi';
import { IoMdDownload, IoMdMap } from 'react-icons/io';
import { RiShieldCheckFill } from 'react-icons/ri';

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

export function DossieBarContainer({ step }) {
    return (
        <DossieBarContainerStyle>
            <header>
                <DossieItemAbaNavegacao
                    step={step}
                    titulo="Dossiê"
                    icone={<TfiMenuAlt />}
                    url="#/#/#"
                />
                <DossieItemAbaNavegacao
                    step={step}
                    titulo="Notificações"
                    icone={<FaBell />}
                    url="#"
                />
                <DossieItemAbaNavegacao
                    step={step}
                    titulo="Preparação"
                    icone={<BsFillGearFill />}
                    url="#"
                />
                <DossieItemAbaNavegacao
                    step={step}
                    titulo="Planejamento"
                    icone={<BiSolidHelpCircle />}
                    url="#/#/#"
                />
                <DossieItemAbaNavegacao
                    step={step}
                    titulo="Investigação"
                    icone={<IoMdMap />}
                    url="#"
                />
                <DossieItemAbaNavegacao
                    step={step}
                    titulo="Intervenção"
                    icone={<IoMdDownload />}
                    url="#"
                />
                <DossieItemAbaNavegacao
                    step={step}
                    titulo="Finalização"
                    icone={<BiCheckDouble />}
                    url="#"
                />
                <DossieItemAbaNavegacao
                    step={step}
                    titulo="Avaliação Externa"
                    icone={<RiShieldCheckFill />}
                    url="#"
                />
            </header>
        </DossieBarContainerStyle>
    );
}
