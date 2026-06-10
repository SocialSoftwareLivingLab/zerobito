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
import Swal from 'sweetalert2';

const STATUS_ORDER = [
    'AGUARDANDO_NOTIFICACOES',
    'EM_PREPARACAO',
    'EM_PLANEJAMENTO',
    'EM_INVESTIGACAO',
    'EM_INTERVENCAO',
    'INTERVENCAO_FINALIZADA'
];

function statusIndex(status: string): number {
    const idx = STATUS_ORDER.indexOf(status);
    return idx === -1 ? 0 : idx;
}

interface MenuNavegacao {
    titulo: string;
    icone: JSX.Element;
    url: (caso: Caso) => string;
    minStatus: string | null;
}

const menus: MenuNavegacao[] = [
    {
        titulo: 'Dossiê',
        icone: <TfiMenuAlt />,
        url: (caso) => `/casos/${caso.id}/dossie`,
        minStatus: null
    },
    {
        titulo: 'Notificações',
        icone: <FaBell />,
        url: (caso) => `${caso.id}/notificacoes`,
        minStatus: null
    },
    {
        titulo: 'Preparação',
        icone: <BsFillGearFill />,
        url: (caso) => `${caso.id}/preparacao`,
        minStatus: null
    },
    {
        titulo: 'Planejamento',
        icone: <BiSolidHelpCircle />,
        url: (caso) => `${caso.id}/planejamento`,
        minStatus: 'EM_PLANEJAMENTO'
    },
    {
        titulo: 'Investigação',
        icone: <IoMdMap />,
        url: (caso) => `${caso.id}/investigacao`,
        minStatus: 'EM_INVESTIGACAO'
    },
    {
        titulo: 'Intervenção',
        icone: <IoMdDownload />,
        url: (caso) => `${caso.id}/intervencao`,
        minStatus: 'EM_INTERVENCAO'
    },
    {
        titulo: 'Finalização',
        icone: <BiCheckDouble />,
        url: (caso) => `${caso.id}/finalizacao`,
        minStatus: 'INTERVENCAO_FINALIZADA'
    },
    {
        titulo: 'Avaliação Externa',
        icone: <RiShieldCheckFill />,
        url: (caso) => `${caso.id}/avaliacao-externa`,
        minStatus: 'INTERVENCAO_FINALIZADA'
    }
];

export function CasoNavegacao() {
    const { caso } = useCasoSelecionado();
    const location = useLocation();
    const currentStatusIdx = statusIndex(caso.status);

    return (
        <CasoNavegacaoContainer>
            <header>
                {menus.map((menu, index) => {
                    const isAccessible =
                        menu.minStatus === null || currentStatusIdx >= statusIndex(menu.minStatus);

                    const url = isAccessible ? menu.url(caso) : '#';

                    const action = isAccessible
                        ? undefined
                        : () =>
                              Swal.fire({
                                  text: `Não é possível acessar "${menu.titulo}" enquanto o caso não está nessa etapa.`,
                                  icon: 'error',
                                  timer: 2000,
                                  showConfirmButton: false,
                                  position: 'center',
                                  toast: true
                              });

                    return (
                        <CasoNavegacaoItem
                            key={index}
                            ativo={location.pathname.includes(menu.url(caso)) ?? false}
                            titulo={menu.titulo}
                            icone={menu.icone}
                            url={url}
                            action={action}
                        />
                    );
                })}
            </header>
        </CasoNavegacaoContainer>
    );
}
