import { useState, useEffect, useCallback } from 'react';
import { listarOcorrencias } from '../../../common/api/casos/consultarOcorrencias';
import { OcorrenciaModel } from '../../../common/models/ocorrencias/model';
import { buscarTarefasCaso } from '../../../common/api/casos/grupo-trabalho/tarefas';
import { useQuery } from '@tanstack/react-query';
import { Tarefa } from '../../../contexts/minhas-tarefas';
import { CalendarItem } from '../../../components/Calendario';
import { getReunioes } from '../../../common/api/casos/planejamento/get-reunioes-marcadas';

const useDossieViewModel = (id: number) => {
    const [eventos, setOcorrencias] = useState<OcorrenciaModel[]>([]);
    const [reunioes, setReunioes] = useState<CalendarItem[]>([]);

    useEffect(() => {
        listarOcorrencias(id).then((response) => {
            setOcorrencias(response.data);
        });
    }, [id]);

    const { data: tarefas = [] } = useQuery({
        queryKey: ['tarefas', id],
        queryFn: () => buscarTarefasCaso(id),
        select: (result) =>
            result.map((tarefa) => ({
                ...tarefa,
                status: tarefa.status.nome
            }))
    });

    useEffect(() => {
        const fetchReunioes = async () => {
            try {
                if (id) {
                    const response = await getReunioes(id);
                    setReunioes(response); // ou apenas response, conforme sua API
                    console.log(response);
                }
            } catch (error) {
                console.error('Erro ao buscar a próxima reunião:', error);
            }
        };

        fetchReunioes(); // chama assim que a página carrega
    }, [id]); // roda sempre que caso.id mudar

    const hoje = new Date();

    const proximosEventos = [
        ...tarefas.map((t) => ({
            tipo: 'tarefa',
            data: new Date(t.prazo),
            ...t // espalha os demais dados da tarefa (inclusive status)
        })),
        ...reunioes.map((r) => ({
            tipo: 'reuniao',
            data: new Date(r.data)
        }))
    ]
        .filter((item) => item.data >= hoje)
        .sort((a, b) => a.data.getTime() - b.data.getTime())
        .slice(0, 4);

    return {
        eventos,
        reunioes,
        proximosEventos,
        tarefas
    };
};

export default useDossieViewModel;
