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

export function DossieBarContainer() {
    return (
        <DossieBarContainerStyle>
            <header>
                <DossieItemAbaNavegacao titulo="Dossiê" icone={<TfiMenuAlt />} url="#/#/#" />
                <DossieItemAbaNavegacao titulo="Notificações" icone={<FaBell />} url="#" />
                <DossieItemAbaNavegacao titulo="Preparação" icone={<BsFillGearFill />} url="#" />
                <DossieItemAbaNavegacao
                    titulo="Planejamento"
                    icone={<BiSolidHelpCircle />}
                    url="#/#/#"
                />
                <DossieItemAbaNavegacao titulo="Investigação" icone={<IoMdMap />} url="#" />
                <DossieItemAbaNavegacao titulo="Intervenção" icone={<IoMdDownload />} url="#" />
                <DossieItemAbaNavegacao titulo="Finalização" icone={<BiCheckDouble />} url="#" />
                <DossieItemAbaNavegacao
                    titulo="Avaliação Externa"
                    icone={<RiShieldCheckFill />}
                    url="#"
                />
            </header>
        </DossieBarContainerStyle>
    );
}
