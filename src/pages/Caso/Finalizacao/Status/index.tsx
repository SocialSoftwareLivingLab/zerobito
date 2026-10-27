import { useQuery } from '@tanstack/react-query';
import { FaCheck } from 'react-icons/fa';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import {
    buscarRelatorioFinalizacao,
    StatusRelatorioFinalizacaoEnum
} from '../../../../common/api/casos/finalizacao/relatorio-finalizacao';
import { StatusContainer } from './styles';

const ETAPAS: Array<{ status: StatusRelatorioFinalizacaoEnum; label: string; descricao: string }> =
    [
        {
            status: StatusRelatorioFinalizacaoEnum.RASCUNHO,
            label: 'Rascunho',
            descricao: 'O relatório pode ser editado e submetido ao GT.'
        },
        {
            status: StatusRelatorioFinalizacaoEnum.REVISAO,
            label: 'Em revisão',
            descricao: 'O relatório foi submetido ao GT e ainda pode ser editado.'
        },
        {
            status: StatusRelatorioFinalizacaoEnum.FINALIZADO,
            label: 'Finalizado',
            descricao: 'O relatório foi finalizado e não pode mais ser editado.'
        }
    ];

export default function StatusFinalizacao() {
    const { caso } = useCasoSelecionado();

    const { data: relatorio } = useQuery({
        queryKey: ['relatorio-finalizacao', caso.id],
        queryFn: () => buscarRelatorioFinalizacao(caso.id)
    });

    if (!relatorio) return null;

    const indiceAtual = ETAPAS.findIndex((etapa) => etapa.status === relatorio.status);

    return (
        <StatusContainer>
            <span className="status-titulo">Status do relatório</span>
            <ol className="status-etapas">
                {ETAPAS.map((etapa, index) => {
                    const concluida = index < indiceAtual;
                    const atual = index === indiceAtual;
                    let classe = '';
                    if (concluida) classe = 'concluida';
                    else if (atual) classe = 'atual';

                    return (
                        <li
                            key={etapa.status}
                            className={`status-etapa ${classe}`}
                            aria-current={atual ? 'step' : undefined}>
                            <span className="status-marcador">
                                {concluida ? <FaCheck /> : index + 1}
                            </span>
                            {etapa.label}
                        </li>
                    );
                })}
            </ol>
            {indiceAtual >= 0 && (
                <span className="status-descricao">{ETAPAS[indiceAtual].descricao}</span>
            )}
        </StatusContainer>
    );
}
