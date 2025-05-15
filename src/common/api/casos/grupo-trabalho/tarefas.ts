import api from '../../../api';
import { Tarefa } from '../../../models/caso/grupo-trabalho/tarefa';

export async function buscarTarefasCaso(idCaso: number) {
    const response = await api.get<Tarefa[]>(
        `/api/v1/casos/${idCaso}/grupo-trabalho/membros/tarefas`
    );

    return response.data;
}
