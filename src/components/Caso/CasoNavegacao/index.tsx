import React from 'react';
import { BiCheckDouble, BiSolidHelpCircle } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { IoMdDownload, IoMdMap } from 'react-icons/io';
import { RiShieldCheckFill } from 'react-icons/ri';
import { TfiMenuAlt } from 'react-icons/tfi';
import { useLocation } from 'react-router-dom';
import { Caso } from '../../../common/models/caso/caso';
import CasoNavegacaoItem from './CasoNavegacaoItem';
import { CasoNavegacaoContainer } from './styles';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';

interface MenuNavegacao {
    titulo: string;
    icone: JSX.Element;
    url: (caso: Caso) => string;
}

const menus: MenuNavegacao[] = [
    {
        titulo: 'Dossiê',
        icone: <TfiMenuAlt />,
        url: (caso) => `/casos/${caso.id}/dossie`
    },
    {
        titulo: 'Notificações',
        icone: <FaBell />,
        url: (caso) => `${caso.id}/notificacoes`
    },
    {
        titulo: 'Preparação',
        icone: <BsFillGearFill />,
        url: (caso) => `${caso.id}/preparacao`
    },
    {
        titulo: 'Planejamento',
        icone: <BiSolidHelpCircle />,
        url: (caso) => `${caso.id}/planejamento`
    },
    {
        titulo: 'Investigação',
        icone: <IoMdMap />,
        url: (caso) => `${caso.id}/investigacao`
    },
    {
        titulo: 'Intervenção',
        icone: <IoMdDownload />,
        url: (caso) => `${caso.id}/intervencao`
    },
    {
        titulo: 'Finalização',
        icone: <BiCheckDouble />,
        url: (caso) => `${caso.id}/finalizacao`
    },
    {
        titulo: 'Avaliação Externa',
        icone: <RiShieldCheckFill />,
        url: (caso) => `${caso.id}/avaliacao-externa`
    }
];

export function CasoNavegacao() {
    const { caso } = useCasoSelecionado();
    const location = useLocation();

    return (
        <CasoNavegacaoContainer>
            <header>
                {menus.map((menu, index) => {
                    return (
                        <CasoNavegacaoItem
                            key={index}
                            ativo={!!location?.pathname?.includes(menu.url(caso))}
                            titulo={menu.titulo}
                            icone={menu.icone}
                            url={menu.url(caso)}
                        />
                    );
                })}
            </header>
        </CasoNavegacaoContainer>
    );
}
