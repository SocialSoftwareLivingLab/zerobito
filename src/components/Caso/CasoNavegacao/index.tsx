import { BiCheckDouble } from 'react-icons/bi';
import { FaBell, FaSearch } from 'react-icons/fa';
import { PiCirclesThreeFill } from 'react-icons/pi';
import { IoMdDownload, IoMdMap } from 'react-icons/io';
import { RiShieldCheckFill } from 'react-icons/ri';
import { TfiMenuAlt } from 'react-icons/tfi';
import { useLocation } from 'react-router-dom';
import { Caso } from '../../../common/models/caso/caso';
import CasoNavegacaoItem from './CasoNavegacaoItem';
import { CasoNavegacaoContainer } from './styles';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import Swal from 'sweetalert2';
import {
    MENSAGEM_BLOQUEIO_FINALIZACAO,
    useAcessoFinalizacao
} from '../../../pages/Caso/Finalizacao/use-acesso-finalizacao';

const STATUS_ORDER = [
    'AGUARDANDO_NOTIFICACOES',
    'EM_PREPARACAO',
    'EM_PLANEJAMENTO',
    'EM_INVESTIGACAO',
    'EM_INTERVENCAO',
    'INTERVENCAO_FINALIZADA',
    'EM_FINALIZACAO'
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
        icone: (
            <span className="circulo-icone">
                <PiCirclesThreeFill style={{ color: 'white' }} />
            </span>
        ),
        url: (caso) => `${caso.id}/preparacao`,
        minStatus: null
    },
    {
        titulo: 'Planejamento',
        icone: <IoMdMap />,
        url: (caso) => `${caso.id}/planejamento`,
        minStatus: 'EM_PLANEJAMENTO'
    },
    {
        titulo: 'Investigação',
        icone: <FaSearch style={{ fontSize: '1.5rem' }} />,
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
        minStatus: 'EM_FINALIZACAO'
    },
    {
        titulo: 'Avaliação Externa',
        icone: <RiShieldCheckFill />,
        url: (caso) => `${caso.id}/avaliacao-externa`,
        minStatus: 'EM_FINALIZACAO'
    }
];

export function CasoNavegacao() {
    const { caso } = useCasoSelecionado();
    const location = useLocation();
    const currentStatusIdx = statusIndex(caso.status);
    const acessoFinalizacao = useAcessoFinalizacao(
        currentStatusIdx >= statusIndex('EM_FINALIZACAO')
    );

    return (
        <CasoNavegacaoContainer>
            <header>
                {menus.map((menu, index) => {
                    const atingiuEtapa =
                        menu.minStatus === null || currentStatusIdx >= statusIndex(menu.minStatus);
                    const bloqueadoNaFinalizacao =
                        menu.titulo === 'Finalização' &&
                        !acessoFinalizacao.carregando &&
                        !acessoFinalizacao.liberado;
                    const isAccessible = atingiuEtapa && !bloqueadoNaFinalizacao;

                    const mensagemBloqueio =
                        atingiuEtapa && bloqueadoNaFinalizacao && acessoFinalizacao.motivo
                            ? MENSAGEM_BLOQUEIO_FINALIZACAO[acessoFinalizacao.motivo]
                            : `Não é possível acessar "${menu.titulo}" enquanto o caso não está nessa etapa.`;

                    const url = isAccessible ? menu.url(caso) : '#';

                    const action = isAccessible
                        ? undefined
                        : () =>
                              Swal.fire({
                                  text: mensagemBloqueio,
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
