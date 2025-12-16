import { useState, useEffect } from 'react';
import { listarOcorrencias } from '../../../common/api/casos/consultarOcorrencias';
import { OcorrenciaModel } from '../../../common/models/ocorrencias/model';
import { useQuery } from '@tanstack/react-query';
import { CalendarItem } from '../../../components/Calendario';
import { getReunioes } from '../../../common/api/casos/intervencao/get-reunioes-marcadas';
import { buscarAcoesIntervencao } from '../../../common/api/casos/intervencao/buscar-acoes';

export const useIntervencaoViewModel = (id: number) => {
    const [eventos, setOcorrencias] = useState<OcorrenciaModel[]>([]);
    const [reunioes, setReunioes] = useState<CalendarItem[]>([]);

    useEffect(() => {
        listarOcorrencias(id).then((response) => {
            setOcorrencias(response.data);
        });
    }, [id]);

    // Buscar ações de intervenção ao invés de tarefas de planejamento
    const { data: acoes = [] } = useQuery({
        queryKey: ['acoes-intervencao', id],
        queryFn: () => buscarAcoesIntervencao(id),
        select: (result) =>
            result.map((acao) => {
                // Determina o status a ser exibido (prioriza status de conclusão)
                const statusNome = acao.statusConclusao?.nome || acao.status.nome;

                return {
                    ...acao,
                    status: statusNome,
                    // Garantir que prazo seja do tipo Date
                    prazo: new Date(acao.prazo)
                };
            })
    });

    useEffect(() => {
        const fetchReunioes = async () => {
            try {
                if (id) {
                    const response = await getReunioes(id);
                    setReunioes(response);
                }
            } catch (error) {
                console.error('Erro ao buscar reuniões:', error);
            }
        };

        fetchReunioes();
    }, [id]);

    const hoje = new Date();

    const proximosEventos = [
        ...acoes.map((a) => ({
            tipo: 'acao' as const,
            data: a.prazo,
            status: a.status,
            nome: a.nome
        })),
        ...reunioes.map((r) => ({
            tipo: 'reuniao' as const,
            data: new Date(r.data)
        }))
    ]
        .filter((item) => item.data >= hoje)
        .sort((a, b) => a.data.getTime() - b.data.getTime());

    return {
        eventos,
        reunioes,
        proximosEventos,
        acoes
    };
};

export default useIntervencaoViewModel;
