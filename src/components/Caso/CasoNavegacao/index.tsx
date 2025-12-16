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

interface MenuNavegacao {
    titulo: string;
    icone: JSX.Element;
    url: (caso: Caso) => string;
    action?: (caso: Caso) => void;
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
                    // Define a URL condicional para "Planejamento"
                    // const isPlanejamentoRestricted =
                    //     menu.titulo === 'Planejamento' &&
                    //     caso.status !== 'EM_PLANEJAMENTO' &&
                    //     caso.status !== 'EM_INVESTIGACAO' &&
                    //     caso.status !== null;

                    // Define a URL condicional para "Intervenção"
                    // const isIntervencaoRestricted =
                    //     menu.titulo === 'Intervenção' &&
                    //     caso.status !== 'EM_INTERVENCAO' &&
                    //     caso.status !== null;

                    // const url = isPlanejamentoRestricted
                    //     ? '#' // Retorna '#' para impedir navegação
                    //     : menu.url(caso); // URL normal para outros casos

                    const url = menu.url(caso);

                    // Adiciona ação ao clique para exibir o alerta, se aplicável
                    const InvalidAcessPlanejamento = () => {
                        Swal.fire({
                            text: 'Não é possível acessar "Planejamento" enquanto o caso não está nessa etapa.',
                            icon: 'error',
                            timer: 2000,
                            showConfirmButton: false,
                            position: 'center',
                            toast: true
                        });
                    };

                    const InvalidAcessIntervencao = () => {
                        Swal.fire({
                            text: 'Não é possível acessar "Intervenção" enquanto o caso não está nessa etapa.',
                            icon: 'error',
                            timer: 2000,
                            showConfirmButton: false,
                            position: 'center',
                            toast: true
                        });
                    };

                    // Define a action baseada no menu
                    // let action;
                    // if (isPlanejamentoRestricted) {
                    //     action = InvalidAcessPlanejamento;
                    // }

                    return (
                        <CasoNavegacaoItem
                            key={index}
                            ativo={location.pathname.includes(menu.url(caso)) ?? false}
                            titulo={menu.titulo}
                            icone={menu.icone}
                            url={url} // Usa a URL condicional
                        />
                    );
                })}
            </header>
        </CasoNavegacaoContainer>
    );
}
